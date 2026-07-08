import multer from "multer";
import path from "path";
import fs from "fs";
import { pool } from "../utils/supabaseDb.js";

// 🔹 Multer Setup for File Uploads
const uploadDir = path.join(process.cwd(), "uploads", "gallery");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/gallery/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), // Unique filename
});

const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB max file size
}).single("image");

// ✅ CREATE: Add a new gallery entry
export const createGallery = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .json({ error: err.message || "File upload failed" });
    if (!req.file)
      return res.status(400).json({ error: "Image file is required" });

    try {
      const { title, description } = req.body;
      const imagePath = `/uploads/gallery/${req.file.filename}`;

      const result = await pool.query(
        "INSERT INTO galleries (title, description, image) VALUES ($1, $2, $3) RETURNING *",
        [title, description, imagePath]
      );

      res.status(201).json({
        message: "Gallery entry created successfully",
        gallery: mapGalleryRow(result.rows[0]),
      });
    } catch (err) {
      next(err);
    }
  });
};

// ✅ READ: Get all gallery entries with image URLs
export const getGallery = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, image, title FROM galleries ORDER BY created_at DESC"
    );
    const data = result.rows.map(row => ({
      _id: row.id,
      image: row.image,
      title: row.title,
    }));
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// ✅ READ: Get a single gallery entry by ID
export const getGalleryById = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM galleries WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Gallery entry not found" });

    res.status(200).json(mapGalleryRow(result.rows[0]));
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE: Modify a gallery entry
export const updateGallery = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .json({ error: err.message || "File upload failed" });

    try {
      const { title, description } = req.body;

      if (req.file) {
        // Delete old image if a new one is uploaded
        const existing = await pool.query("SELECT image FROM galleries WHERE id = $1", [req.params.id]);
        if (existing.rows.length > 0 && existing.rows[0].image) {
          try {
            fs.unlinkSync(path.join(process.cwd(), existing.rows[0].image));
          } catch (e) {
            // Ignore file not found errors
          }
        }

        const result = await pool.query(
          `UPDATE galleries SET title = $1, description = $2, image = $3, updated_at = CURRENT_TIMESTAMP
           WHERE id = $4 RETURNING *`,
          [title, description, `/uploads/gallery/${req.file.filename}`, req.params.id]
        );

        if (result.rows.length === 0)
          return res.status(404).json({ error: "Gallery entry not found" });

        return res.status(200).json({
          message: "Gallery entry updated successfully",
          gallery: mapGalleryRow(result.rows[0]),
        });
      }

      const result = await pool.query(
        `UPDATE galleries SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP
         WHERE id = $3 RETURNING *`,
        [title, description, req.params.id]
      );

      if (result.rows.length === 0)
        return res.status(404).json({ error: "Gallery entry not found" });

      res.status(200).json({
        message: "Gallery entry updated successfully",
        gallery: mapGalleryRow(result.rows[0]),
      });
    } catch (err) {
      next(err);
    }
  });
};

// ✅ DELETE: Remove a gallery entry
export const deleteGallery = async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM galleries WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Item not found" });

    const galleryItem = result.rows[0];

    // Delete the image file
    try {
      fs.unlinkSync(path.join(process.cwd(), galleryItem.image));
    } catch (e) {
      // Ignore file not found errors
    }

    res.status(200).json({
      message: `Gallery entry "${galleryItem.title}" deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper: map snake_case DB row to camelCase for frontend
function mapGalleryRow(row) {
  if (!row) return null;
  return {
    _id: row.id,
    image: row.image,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
