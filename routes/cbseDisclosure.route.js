import express from "express";
import {
  getDisclosure,
  updateDisclosure,
  uploadDisclosureDoc,
} from "../controllers/cbseDisclosure.controller.js";
import authenticateAdmin from "../utils/authenticate.js";

const router = express.Router();

// Get disclosure data (public)
router.get("/", getDisclosure);

// Update disclosure data (admin only)
router.put("/", authenticateAdmin, updateDisclosure);

// Upload document (admin only)
router.post("/upload", authenticateAdmin, uploadDisclosureDoc);

export default router;
