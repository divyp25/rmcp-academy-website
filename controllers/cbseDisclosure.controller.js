import { pool } from "../utils/supabaseDb.js";
import { uploadCloud } from "../utils/cloudinary.js";

// 🔹 Get CBSE Disclosure data
export const getDisclosure = async (req, res) => {
  try {
    let result = await pool.query("SELECT * FROM cbse_disclosures LIMIT 1");
    if (result.rows.length === 0) {
      result = await pool.query(
        "INSERT INTO cbse_disclosures (general_info, documents, academics, staff, infrastructure) VALUES ('{}', '{}', '{}', '{}', '{}') RETURNING *"
      );
    }
    const row = result.rows[0];
    res.json(mapDisclosureRow(row));
  } catch (err) {
    console.error("Get Disclosure Error:", err);
    res.status(500).json({ error: "Failed to fetch disclosure data" });
  }
};

// 🔹 Update CBSE Disclosure data
export const updateDisclosure = async (req, res) => {
  try {
    let result = await pool.query("SELECT * FROM cbse_disclosures LIMIT 1");

    if (result.rows.length === 0) {
      // Create new
      const body = req.body;
      result = await pool.query(
        `INSERT INTO cbse_disclosures (general_info, documents, academics, staff, infrastructure)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          JSON.stringify(body.generalInfo || {}),
          JSON.stringify(body.documents || {}),
          JSON.stringify(body.academics || {}),
          JSON.stringify(body.staff || {}),
          JSON.stringify(body.infrastructure || {}),
        ]
      );
    } else {
      // Update existing
      const existing = result.rows[0];
      const body = req.body;
      result = await pool.query(
        `UPDATE cbse_disclosures SET
          general_info = $1,
          documents = $2,
          academics = $3,
          staff = $4,
          infrastructure = $5,
          updated_at = CURRENT_TIMESTAMP
         WHERE id = $6 RETURNING *`,
        [
          JSON.stringify(body.generalInfo || existing.general_info || {}),
          JSON.stringify(body.documents || existing.documents || {}),
          JSON.stringify(body.academics || existing.academics || {}),
          JSON.stringify(body.staff || existing.staff || {}),
          JSON.stringify(body.infrastructure || existing.infrastructure || {}),
          existing.id,
        ]
      );
    }

    res.json(mapDisclosureRow(result.rows[0]));
  } catch (err) {
    console.error("Update Disclosure Error:", err);
    res.status(500).json({ error: "Failed to update disclosure data" });
  }
};

export const uploadDisclosureDoc = [
  uploadCloud,
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const file = req.files[0]; // Because we're using `.any()`
      res.json({ url: file.path });
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ error: "Failed to upload document" });
    }
  },
];

// Helper: map snake_case DB row to camelCase for frontend
function mapDisclosureRow(row) {
  if (!row) return null;
  return {
    _id: row.id,
    generalInfo: row.general_info,
    documents: row.documents,
    academics: row.academics,
    staff: row.staff,
    infrastructure: row.infrastructure,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
