import { Router } from "express";
import {
  createTopStudent,
  getTopStudents,
  getTopStudentById,
  updateTopStudent,
  deleteTopStudent,
} from "../controllers/topStudents.controller.js";
import authenticateAdmin from "../utils/authenticate.js";

const router = Router();

router.post("/", authenticateAdmin, createTopStudent); // Create
router.get("/", getTopStudents); // Read All
router.get("/:id", getTopStudentById); // Read One
router.put("/:id", authenticateAdmin, updateTopStudent); // Update
router.delete("/:id", authenticateAdmin, deleteTopStudent); // Delete

export default router;
