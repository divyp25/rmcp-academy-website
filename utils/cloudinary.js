import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const { name } = path.parse(file.originalname);
    return {
      folder: "cbse_disclosure",
      resource_type: "auto",
      public_id: `${Date.now()}-${name.replace(/\s+/g, "_")}`,
    };
  },
});

// 🔹 Accept any field name for flexibility
export const uploadCloud = multer({ storage }).any(); // Accept any field
