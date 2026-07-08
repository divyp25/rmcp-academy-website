import { pool } from "../utils/supabaseDb.js";
import nodemailer from "nodemailer";

// Helper to send email containing token number
const sendTokenEmail = async (parentEmail, parentName, studentName, tokenNumber) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "rmcpacademy.enquiry@gmail.com",
        pass: process.env.SMTP_PASS || "rmcp_dummy_password",
      },
    });

    const mailOptions = {
      from: `"RMCP Academy Admissions" <${process.env.SMTP_USER || "rmcpacademy.enquiry@gmail.com"}>`,
      to: parentEmail,
      subject: `Admission Enquiry Token Number: ${tokenNumber}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 25px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0077FF; text-align: center; margin-bottom: 5px;">RMCP Academy</h2>
          <p style="text-align: center; color: #64748b; font-size: 13px; margin-top: 0;">Ghanshyampur, Bilsanda</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <p>Dear <strong>${parentName}</strong>,</p>
          <p>Thank you for submitting the admission enquiry for your ward, <strong>${studentName}</strong>.</p>
          <p>We have successfully received your enquiry and the registration fee payment details.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; border: 1px dashed #0077FF;">
            <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: bold; display: block; margin-bottom: 5px;">Your Admission Token Number</span>
            <span style="color: #0077FF; font-size: 32px; font-weight: 900; letter-spacing: 1px;">${tokenNumber}</span>
          </div>

          <p>Please keep this token number handy for all future communication. Our admissions team will review your application and reach out to you shortly.</p>
          
          <p style="margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 13px; color: #64748b;">
            Best regards,<br />
            <strong>Admissions Desk</strong><br />
            RMCP Academy
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email sent successfully! MessageId:", info.messageId);
    return true;
  } catch (error) {
    console.warn("⚠️ Failed to send email (SMTP configurations may be missing):", error.message);
    return false;
  }
};

// CREATE: Add a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const {
      admissionClass, studentName, fatherName, motherName,
      gender, dateOfBirth, fatherMobile, email, category,
      lastSchoolAttended, fatherOccupation, motherOccupation,
      address, referredBy, paymentStatus, transactionId
    } = req.body;

    // Generate unique token number: e.g. RMCP-ENQ-168482 (random number format)
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const tokenNumber = `RMCP-ENQ-${randomSuffix}`;

    const result = await pool.query(
      `INSERT INTO enquiries (
        admission_class, student_name, father_name, mother_name,
        gender, date_of_birth, father_mobile, email, category,
        last_school_attended, father_occupation, mother_occupation,
        address, referred_by, payment_status, transaction_id, token_number
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
      [
        admissionClass, studentName, fatherName, motherName || null,
        gender || null, dateOfBirth || null, fatherMobile, email, category || null,
        lastSchoolAttended || null, fatherOccupation || null, motherOccupation || null,
        address || null, referredBy || null, paymentStatus || 'pending', transactionId || null, tokenNumber
      ]
    );

    if (result.rows.length === 0) {
      throw Error("Enquiry not created");
    }

    const newEnquiry = mapEnquiryRow(result.rows[0]);

    // Send the token number to parent's email address asynchronously
    sendTokenEmail(email, fatherName, studentName, tokenNumber);

    res.status(201).json({ 
      message: "Enquiry created successfully", 
      enquiry: newEnquiry 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ: Get all enquiries with pagination & search
const getEnquiries = async (req, res) => {
  try {
    const { search, admissionClass, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (search) {
      whereClause += ` AND (student_name ILIKE $${paramIndex} OR token_number ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (admissionClass) {
      whereClause += ` AND admission_class ILIKE $${paramIndex}`;
      params.push(admissionClass);
      paramIndex++;
    }

    const result = await pool.query(
      `SELECT id, student_name, admission_class, category, referred_by, father_mobile, payment_status, token_number
       FROM enquiries ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, parseInt(limit), offset]
    );

    const data = result.rows.map(row => ({
      _id: row.id,
      studentName: row.student_name,
      admissionClass: row.admission_class,
      category: row.category,
      referredBy: row.referred_by,
      fatherMobile: row.father_mobile,
      paymentStatus: row.payment_status,
      tokenNumber: row.token_number
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};

// READ: Get a single enquiry by ID
const getEnquiryById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM enquiries WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Enquiry not found" });

    res.status(200).json(mapEnquiryRow(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: "Invalid Enquiry ID" });
  }
};

// DELETE: Remove an enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM enquiries WHERE id = $1 RETURNING id",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Enquiry not found" });

    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete enquiry" });
  }
};

// Helper: map snake_case DB row to camelCase for frontend
function mapEnquiryRow(row) {
  if (!row) return null;
  return {
    _id: row.id,
    admissionClass: row.admission_class,
    studentName: row.student_name,
    fatherName: row.father_name,
    motherName: row.mother_name,
    gender: row.gender,
    dateOfBirth: row.date_of_birth,
    fatherMobile: row.father_mobile,
    email: row.email,
    category: row.category,
    lastSchoolAttended: row.last_school_attended,
    fatherOccupation: row.father_occupation,
    motherOccupation: row.mother_occupation,
    address: row.address,
    referredBy: row.referred_by,
    paymentStatus: row.payment_status,
    transactionId: row.transaction_id,
    tokenNumber: row.token_number,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export { createEnquiry, getEnquiries, getEnquiryById, deleteEnquiry };
