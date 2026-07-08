import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  deleteEnquiry,
} from "../controllers/enquiry.controller.js";
import authenticateAdmin from "../utils/authenticate.js";

const router = express.Router();

// Routes
router.post("/", createEnquiry); // Create a new enquiry
router.get("/", authenticateAdmin, getEnquiries); // Get all enquiries
router.get("/:id", authenticateAdmin, getEnquiryById); // Get enquiry by ID
router.delete("/:id", authenticateAdmin, deleteEnquiry); // Delete enquiry by ID

export default router;
