import { Router, static as static_ } from "express";
import {
  createGallery,
  getGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/gallery.controller.js";
import authenticateAdmin from "../utils/authenticate.js";

const router = Router();

router.post("/", authenticateAdmin, createGallery); // Create Gallery Entry
router.get("/", getGallery); // Get All Gallery Entries
router.get("/:id", getGalleryById); // Get Single Gallery Entry
router.put("/:id", authenticateAdmin, updateGallery); // Update Gallery Entry
router.delete("/:id", authenticateAdmin, deleteGallery); // Delete Gallery Entry
export default router;
