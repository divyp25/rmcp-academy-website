import { pool } from "../utils/supabaseDb.js";

// Create a new TC request
const createTcRequest = async (req, res) => {
  try {
    const { studentName, admissionNumber, aadharUid, parentName, reason, contact, email, paymentStatus, transactionId } = req.body;

    const result = await pool.query(
      `INSERT INTO tc_requests (student_name, admission_number, aadhar_uid, parent_name, reason, contact, email, payment_status, transaction_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [studentName, admissionNumber, aadharUid, parentName, reason, contact, email, paymentStatus || 'pending', transactionId]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ error: "Could not create TC request" });

    res.status(201).json(mapTcRow(result.rows[0]));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all TC requests
const getAllTcRequests = async (req, res) => {
  try {
    const { search, admissionNumber, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (search) {
      whereClause += ` AND student_name ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (admissionNumber) {
      whereClause += ` AND admission_number ILIKE $${paramIndex}`;
      params.push(`%${admissionNumber}%`);
      paramIndex++;
    }

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM tc_requests ${whereClause}`,
      params
    );
    const totalRequests = parseInt(countResult.rows[0].count);

    // Get paginated data
    const result = await pool.query(
      `SELECT id, student_name, contact, admission_number, payment_status, email
       FROM tc_requests ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, parseInt(limit), offset]
    );

    const data = result.rows.map(row => ({
      _id: row.id,
      studentName: row.student_name,
      contact: row.contact,
      admissionNumber: row.admission_number,
      paymentStatus: row.payment_status,
      email: row.email,
    }));

    res.status(200).json({
      data,
      totalRequests,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRequests / limit),
    });
  } catch (error) {
    console.error("Error in getAllTcRequests:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single TC request by ID
const getTcRequestById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tc_requests WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "TC Request not found" });

    res.status(200).json(mapTcRow(result.rows[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTcRequestAdmissionNumber = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM tc_requests WHERE admission_number = $1",
      [req.params.id]
    );
    const count = parseInt(result.rows[0].count);
    if (count === 0)
      return res.status(404).json({ error: "TC Request not found" });

    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a TC request by ID
const deleteTcRequest = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tc_requests WHERE id = $1 RETURNING id",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "TC Request not found" });

    res.status(200).json({ message: "TC Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper: map snake_case DB row to camelCase for frontend
function mapTcRow(row) {
  if (!row) return null;
  return {
    _id: row.id,
    studentName: row.student_name,
    admissionNumber: row.admission_number,
    aadharUid: row.aadhar_uid,
    parentName: row.parent_name,
    reason: row.reason,
    contact: row.contact,
    email: row.email,
    paymentStatus: row.payment_status,
    transactionId: row.transaction_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export {
  createTcRequest,
  getAllTcRequests,
  getTcRequestAdmissionNumber,
  getTcRequestById,
  deleteTcRequest,
};
