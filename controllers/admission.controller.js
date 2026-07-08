import { v2 as cloudinary } from "cloudinary";
import { pool } from "../utils/supabaseDb.js";
import { uploadCloud } from "../utils/cloudinary.js";
import path from "path";

// ✅ CREATE: Add a new admission
export const createAdmission = (req, res, next) => {
  uploadCloud(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: err.message || "File upload failed" });
    }
    try {
      const studentData = { ...req.body };

      if (req.files) {
        Object.keys(req.files).forEach((key) => {
          if (req.files[key]?.[0]?.path) {
            studentData[key] = req.files[key][0].path;
          }
        });
      }

      const result = await pool.query(
        `INSERT INTO admissions (
          student_first_name, student_middle_name, student_last_name,
          student_aadhar_no, student_aadhar_file, student_photo,
          student_migration_document, student_birth_certificate,
          abc_card, abc_id,
          father_first_name, father_middle_name, father_last_name,
          father_aadhar_file, father_photo,
          mother_first_name, mother_middle_name, mother_last_name,
          mother_aadhar_file, mother_photo,
          domicile_certificate, contact_no,
          previous_school_tc, previous_marksheet,
          admission_class, government_scholarship,
          scholarship_document, payment_status, transaction_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24, $25, $26, $27, $28, $29
        ) RETURNING *`,
        [
          studentData.studentFirstName, studentData.studentMiddleName, studentData.studentLastName,
          studentData.studentAadharNo, studentData.studentAadharFile, studentData.studentPhoto,
          studentData.studentMigrationDocument, studentData.studentBirthCertificate,
          studentData.abcCard, studentData.abcId,
          studentData.fatherFirstName, studentData.fatherMiddleName, studentData.fatherLastName,
          studentData.fatherAadharFile, studentData.fatherPhoto,
          studentData.motherFirstName, studentData.motherMiddleName, studentData.motherLastName,
          studentData.motherAadharFile, studentData.motherPhoto,
          studentData.domicileCertificate, studentData.contactNo,
          studentData.previousSchoolTC, studentData.previousMarksheet,
          studentData.admissionClass, studentData.governmentScholarship || 'no',
          studentData.scholarshipDocument, studentData.paymentStatus || 'pending',
          studentData.transactionId
        ]
      );

      // Map row back to camelCase for frontend compatibility
      const admission = mapAdmissionRow(result.rows[0]);
      res.status(201).json({
        message: "application added successfully",
        admission,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

// ✅ READ: Get all students with search and pagination
export const getAdmissions = async (req, res, next) => {
  try {
    let { page = 1, limit = 50, search = "", admissionClass = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (search) {
      whereClause += ` AND (student_first_name ILIKE $${paramIndex} OR student_middle_name ILIKE $${paramIndex} OR student_last_name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (admissionClass) {
      whereClause += ` AND admission_class = $${paramIndex}`;
      params.push(admissionClass);
      paramIndex++;
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM admissions ${whereClause}`,
      params
    );
    const totalRecords = parseInt(countResult.rows[0].count);

    const dataResult = await pool.query(
      `SELECT id, student_first_name, student_last_name, admission_class, abc_id, contact_no, payment_status
       FROM admissions ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    // Map to camelCase for frontend compatibility
    const data = dataResult.rows.map(row => ({
      _id: row.id,
      studentFirstName: row.student_first_name,
      studentLastName: row.student_last_name,
      admissionClass: row.admission_class,
      abcId: row.abc_id,
      contactNo: row.contact_no,
      paymentStatus: row.payment_status,
    }));

    res.status(200).json({
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdmissionById = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM admissions WHERE id = $1", [req.params.id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Admission record not found" });

    res.status(200).json(mapAdmissionRow(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE: Remove an admission record and delete files from Cloudinary
export const deleteAdmission = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM admissions WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Student not found" });

    const admission = result.rows[0];

    // Delete files from Cloudinary
    const fileColumns = [
      'student_aadhar_file', 'student_photo', 'student_migration_document',
      'student_birth_certificate', 'abc_card', 'father_aadhar_file',
      'father_photo', 'mother_aadhar_file', 'mother_photo',
      'domicile_certificate', 'previous_school_tc', 'previous_marksheet',
      'scholarship_document'
    ];

    for (const col of fileColumns) {
      const fileUrl = admission[col];
      if (fileUrl) {
        const fileName = path.basename(fileUrl);
        const publicId = `admission_documents/${fileName.split(".")[0]}`;
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          // Ignore cloudinary errors during cleanup
        }
      }
    }

    await pool.query("DELETE FROM admissions WHERE id = $1", [req.params.id]);
    res.status(200).json({ message: "Admission record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper: map snake_case DB row to camelCase for frontend
function mapAdmissionRow(row) {
  if (!row) return null;
  return {
    _id: row.id,
    studentFirstName: row.student_first_name,
    studentMiddleName: row.student_middle_name,
    studentLastName: row.student_last_name,
    studentAadharNo: row.student_aadhar_no,
    studentAadharFile: row.student_aadhar_file,
    studentPhoto: row.student_photo,
    studentMigrationDocument: row.student_migration_document,
    studentBirthCertificate: row.student_birth_certificate,
    abcCard: row.abc_card,
    abcId: row.abc_id,
    fatherFirstName: row.father_first_name,
    fatherMiddleName: row.father_middle_name,
    fatherLastName: row.father_last_name,
    fatherAadharFile: row.father_aadhar_file,
    fatherPhoto: row.father_photo,
    motherFirstName: row.mother_first_name,
    motherMiddleName: row.mother_middle_name,
    motherLastName: row.mother_last_name,
    motherAadharFile: row.mother_aadhar_file,
    motherPhoto: row.mother_photo,
    domicileCertificate: row.domicile_certificate,
    contactNo: row.contact_no,
    previousSchoolTC: row.previous_school_tc,
    previousMarksheet: row.previous_marksheet,
    admissionClass: row.admission_class,
    governmentScholarship: row.government_scholarship,
    scholarshipDocument: row.scholarship_document,
    paymentStatus: row.payment_status,
    transactionId: row.transaction_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
