import { pool } from "./utils/supabaseDb.js";

async function test() {
  try {
    const search = "";
    const admissionClass = "";
    const page = 1;
    const limit = 50;

    const queryParams = [];
    const conditions = [];

    // Simulate query logic
    if (search !== undefined) { // Check how Mongoose/Express parsed it
      conditions.push(`data->>'studentName' ILIKE $${conditions.length + 1}`);
      queryParams.push(`%${search}%`);
    }

    if (admissionClass !== undefined) {
      conditions.push(`data->>'admissionClass' ILIKE $${conditions.length + 1}`);
      queryParams.push(admissionClass);
    }

    let baseWhere = "";
    if (conditions.length > 0) {
      baseWhere = " WHERE " + conditions.join(" AND ");
    }

    const limitVal = parseInt(limit);
    const offsetVal = (parseInt(page) - 1) * limitVal;

    queryParams.push(limitVal);
    const limitIndex = queryParams.length;
    queryParams.push(offsetVal);
    const offsetIndex = queryParams.length;

    const selectSql = `SELECT id, data FROM enquiries ${baseWhere} ORDER BY created_at DESC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;
    console.log("SQL:", selectSql);
    console.log("PARAMS:", queryParams);

    const res = await pool.query(selectSql, queryParams);
    console.log("SUCCESS:", res.rows);
    process.exit(0);
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    process.exit(1);
  }
}

test();
