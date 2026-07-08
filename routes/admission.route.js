import { Router } from "express";
import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  deleteAdmission,
} from "../controllers/admission.controller.js";

import authenticateAdmin from "../utils/authenticate.js";

const router = Router();

router.post("/", createAdmission); // Create Admission Record
router.get("/", authenticateAdmin, getAdmissions); // Get All Admissions
router.get("/:id", authenticateAdmin, getAdmissionById); // Get Single Admission Record
router.delete("/:id", authenticateAdmin, deleteAdmission); // Delete Admission Record

export default router;
