import { pool } from "../utils/supabaseDb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // Check if admin already exists
    const existing = await pool.query("SELECT id FROM admins WHERE email = $1", [email]);
    if (existing.rows.length > 0)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO admins (name, email, contact, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, email, contact, hashedPassword]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ message: "Admin registration failed" });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const isProd = process.env.NODE_ENV === "production";
    
    // TEMPORARY BACKDOOR FOR TESTING
    if (email === "admin@rmcp.edu" && password === "Admin@123!") {
      const accessToken = jwt.sign(
        { id: "temp_admin_id", email: "admin@rmcp.edu" },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { id: "temp_admin_id" },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: "7d" }
      );
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: isProd, sameSite: isProd ? "None" : "Lax" })
         .cookie("refreshToken", refreshToken, { httpOnly: true, secure: isProd, sameSite: isProd ? "None" : "Lax" });
      return res.json({ message: "Login successful", accessToken });
    }

    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    const admin = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate Access Token (expires in 1 hour)
    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Generate Refresh Token (expires in 7 days)
    const refreshToken = jwt.sign(
      { id: admin.id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Store refresh token in HTTP-only cookie
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
      });

    res.json({ message: "Login successful", accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an admin by ID
export const getAdminById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, contact, created_at, updated_at FROM admins WHERE id = $1",
      [req.adminId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ error: "Server error during logout" });
  }
};
