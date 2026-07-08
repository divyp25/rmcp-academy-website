import { Router } from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobListing.controller.js";
import authenticateAdmin from "../utils/authenticate.js";

const router = Router();

router.post("/", authenticateAdmin, createJob); // Create Job
router.get("/", getJobs); // Get All Jobs (with search & pagination)
router.get("/:id", getJobById); // Get Single Job
router.put("/:id", authenticateAdmin, updateJob); // Update Job
router.delete("/:id", authenticateAdmin, deleteJob); // Delete Job

export default router;
