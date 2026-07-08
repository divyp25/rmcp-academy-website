import { pool } from "../utils/supabaseDb.js";

// CREATE: Add a new job listing
const createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, keyResponsibilities, qualificationsAndRequirements, employmentType } = req.body;

    const result = await pool.query(
      `INSERT INTO job_listings (job_title, job_description, key_responsibilities, qualifications_and_requirements, employment_type)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [jobTitle, jobDescription, keyResponsibilities, qualificationsAndRequirements, employmentType]
    );

    if (result.rows.length === 0) {
      throw Error("Job not created");
    }

    res.status(201).json({ message: "Job created successfully", job: mapJobRow(result.rows[0]) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ: Get all jobs with pagination & search
const getJobs = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = "";
    const params = [];
    let paramIndex = 1;

    if (search) {
      whereClause = `WHERE job_title ILIKE $${paramIndex} OR job_description ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const result = await pool.query(
      `SELECT id, job_title, job_description, updated_at
       FROM job_listings ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, parseInt(limit), offset]
    );

    const data = result.rows.map(row => ({
      _id: row.id,
      jobTitle: row.job_title,
      jobDescription: row.job_description,
      updatedAt: row.updated_at,
    }));

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// READ: Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM job_listings WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Job not found" });

    res.status(200).json(mapJobRow(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: "Invalid Job ID" });
  }
};

// UPDATE: Modify a job listing
const updateJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, keyResponsibilities, qualificationsAndRequirements, employmentType } = req.body;

    const result = await pool.query(
      `UPDATE job_listings SET
        job_title = $1,
        job_description = $2,
        key_responsibilities = $3,
        qualifications_and_requirements = $4,
        employment_type = $5,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [jobTitle, jobDescription, keyResponsibilities, qualificationsAndRequirements, employmentType, req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Job not found" });

    res.status(200).json({ message: "Job updated successfully", updatedJob: mapJobRow(result.rows[0]) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: Remove a job listing
const deleteJob = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM job_listings WHERE id = $1 RETURNING id",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Job not found" });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
};

// Helper: map snake_case DB row to camelCase for frontend
function mapJobRow(row) {
  if (!row) return null;
  return {
    _id: row.id,
    jobTitle: row.job_title,
    jobDescription: row.job_description,
    keyResponsibilities: row.key_responsibilities,
    qualificationsAndRequirements: row.qualifications_and_requirements,
    employmentType: row.employment_type,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export { createJob, getJobs, getJobById, updateJob, deleteJob };
