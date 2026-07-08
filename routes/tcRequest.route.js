import { Router } from "express";
import {
  createTcRequest,
  getAllTcRequests,
  getTcRequestById,
  deleteTcRequest,
  getTcRequestAdmissionNumber,
} from "../controllers/tcRequest.controller.js";
import authenticateAdmin from "../utils/authenticate.js";

const router = Router();
// Define routes for TC Requests
router.post("/", createTcRequest);
router.get("/", authenticateAdmin, getAllTcRequests);
router.get("/:id", authenticateAdmin, getTcRequestById);
router.get("/admission-number/:id", getTcRequestAdmissionNumber);
router.delete("/:id", authenticateAdmin, deleteTcRequest);

export default router;
