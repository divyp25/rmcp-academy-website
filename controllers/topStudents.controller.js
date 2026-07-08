import multer from "multer";
import path from "path";
import fs from "fs";
import { pool } from "../utils/supabaseDb.js";

// Helper to convert class numbers to Roman numerals
const convertClassToRoman = (classStr) => {
  if (!classStr) return "";
  let replaced = classStr.replace(/\b(12|11|10|9|8|7|6|5|4|3|2|1)(?:st|nd|rd|th)?\b/gi, (match, numStr) => {
    const num = parseInt(numStr, 10);
    const romanMap = {
      12: "XII",
      11: "XI",
      10: "X",
      9: "IX",
      8: "VIII",
      7: "VII",
      6: "VI",
      5: "V",
      4: "IV",
      3: "III",
      2: "II",
      1: "I"
    };
    return romanMap[num] || match;
  });
  return replaced.replace(/\b(xii|xi|x|ix|viii|vii|vi|v|iv|iii|ii|i)\b/gi, (match) => match.toUpperCase());
};

// Helper to automatically update and sort ranks based on scores descending
const updateRanks = async () => {
  try {
    // 1. Fetch all top students
    const res = await pool.query("SELECT id, percentile FROM top_students");
    const students = res.rows;
    
    // 2. Parse scores and sort descending
    const parseScore = (str) => {
      if (!str) return 0;
      const match = str.match(/\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : 0;
    };
    
    students.sort((a, b) => parseScore(b.percentile) - parseScore(a.percentile));
    
    // 3. Set temporary negative ranks to prevent UNIQUE constraint violation during updates
    for (let i = 0; i < students.length; i++) {
      await pool.query("UPDATE top_students SET rank = $1 WHERE id = $2", [-(i + 1), students[i].id]);
    }
    
    // 4. Update final sorted positive ranks
    for (let i = 0; i < students.length; i++) {
      await pool.query("UPDATE top_students SET rank = $1 WHERE id = $2", [i + 1, students[i].id]);
    }
    console.log("✅ Top students ranks updated successfully based on score.");
  } catch (error) {
    console.error("❌ Failed to update student ranks:", error);
  }
};

// 🔹 Multer Setup for Top Students Photo Uploads
const uploadDir = path.join(process.cwd(), "uploads", "gallery");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/gallery/"),
  filename: (req, file, cb) =>
    cb(null, "student_" + Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 },
}).single("photo");

// ✅ CREATE: Add a new top student
export const createTopStudent = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .json({ error: err.message || "File upload failed" });

    try {
      const { name, className, percentile, photoUrl } = req.body;
      const formattedClass = convertClassToRoman(className);
      const photoPath = req.file ? `/uploads/gallery/${req.file.filename}` : (photoUrl || null);

      // Insert with temp rank (max + 1)
      const result = await pool.query(
        "INSERT INTO top_students (name, class, percentile, photo, rank) VALUES ($1, $2, $3, $4, (SELECT COALESCE(MAX(rank), 0) + 1 FROM top_students)) RETURNING *",
        [name, formattedClass, percentile, photoPath]
      );

      // Update ranks based on scores
      await updateRanks();

      // Retrieve newly created student with its calculated rank
      const updatedStudent = await pool.query("SELECT * FROM top_students WHERE id = $1", [result.rows[0].id]);

      res.status(201).json({
        message: "Top student added successfully",
        student: mapStudentRow(updatedStudent.rows[0]),
      });
    } catch (err) {
      next(err);
    }
  });
};

// ✅ READ: Get all top students sorted by rank
export const getTopStudents = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM top_students ORDER BY rank ASC"
    );
    res.status(200).json(result.rows.map(mapStudentRow));
  } catch (err) {
    next(err);
  }
};

// ✅ READ: Get a single top student by ID
export const getTopStudentById = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM top_students WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Student not found" });

    res.status(200).json(mapStudentRow(result.rows[0]));
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE: Modify top student details
export const updateTopStudent = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .json({ error: err.message || "File upload failed" });

    try {
      const { name, className, percentile, photoUrl } = req.body;
      const formattedClass = convertClassToRoman(className);

      if (req.file || photoUrl) {
        // Delete old photo if exists
        const existing = await pool.query("SELECT photo FROM top_students WHERE id = $1", [req.params.id]);
        if (existing.rows.length > 0 && existing.rows[0].photo) {
          const relativePath = existing.rows[0].photo.replace(/^\//, "");
          try {
            fs.unlinkSync(path.join(process.cwd(), relativePath));
          } catch (e) {
            // Ignore if file doesn't exist
          }
        }

        const photoPath = req.file ? `/uploads/gallery/${req.file.filename}` : photoUrl;
        await pool.query(
          `UPDATE top_students SET name = $1, class = $2, percentile = $3, photo = $4, updated_at = CURRENT_TIMESTAMP
           WHERE id = $5`,
          [name, formattedClass, percentile, photoPath, req.params.id]
        );
      } else {
        await pool.query(
          `UPDATE top_students SET name = $1, class = $2, percentile = $3, updated_at = CURRENT_TIMESTAMP
           WHERE id = $4`,
          [name, formattedClass, percentile, req.params.id]
        );
      }

      // Re-rank all students
      await updateRanks();

      const updatedStudent = await pool.query("SELECT * FROM top_students WHERE id = $1", [req.params.id]);
      if (updatedStudent.rows.length === 0)
        return res.status(404).json({ error: "Student not found" });

      res.status(200).json({
        message: "Top student updated successfully",
        student: mapStudentRow(updatedStudent.rows[0]),
      });
    } catch (err) {
      next(err);
    }
  });
};

// ✅ DELETE: Remove top student entry
export const deleteTopStudent = async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM top_students WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Student not found" });

    const student = result.rows[0];

    // Delete photo file if exists
    if (student.photo) {
      const relativePath = student.photo.replace(/^\//, "");
      try {
        fs.unlinkSync(path.join(process.cwd(), relativePath));
      } catch (e) {
        // Ignore file not found
      }
    }

    // Re-rank remaining students
    await updateRanks();

    res.status(200).json({
      message: `Top student "${student.name}" removed successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper mapper
function mapStudentRow(row) {
  if (!row) return null;
  return {
    _id: row.id,
    name: row.name,
    class: row.class,
    percentile: row.percentile,
    photo: row.photo,
    rank: row.rank,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
