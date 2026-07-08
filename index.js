import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

// Routes
import adminRoute from "./routes/auth.route.js";
import jobRoutes from "./routes/jobListing.route.js";
import galleryRoutes from "./routes/gallery.route.js";
import enquiryRoute from "./routes/enquiry.route.js";
import tcRequestRoute from "./routes/tcRequest.route.js";
import admissionRoute from "./routes/admission.route.js";
import cbseDisclosureRoutes from "./routes/cbseDisclosure.route.js";
import cmsRoutes from "./routes/cms.route.js";
import topStudentRoutes from "./routes/topStudents.route.js";
import razorpayRoute from "./utils/razorpay.js";
import { initSupabaseDb } from "./utils/supabaseDb.js";

// Initialize
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONT_END_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        if (origin.startsWith("http://localhost:")) {
          return callback(null, true);
        }
        return callback(new Error("CORS policy blocked access from this origin"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use(
  "/v1/uploads/gallery",
  express.static(path.join(__dirname, "uploads/gallery"))
);
app.use("/cbse", express.static(path.join(__dirname, "/client/cbse")));
app.use("/", express.static(path.join(__dirname, "/client/dist")));

// Routes
app.use("/v1/api/auth", adminRoute);
app.use("/v1/api/jobs", jobRoutes);
app.use("/v1/api/gallery", galleryRoutes);
app.use("/v1/api/enquiry", enquiryRoute);
app.use("/v1/api/tc-request", tcRequestRoute);
app.use("/v1/api/admission", admissionRoute);
app.use("/v1/api/cbse-disclosure", cbseDisclosureRoutes);
app.use("/v1/api/cms", cmsRoutes);
app.use("/v1/api/top-students", topStudentRoutes);
app.use("/v1/api/razorpay", razorpayRoute);

// Health check
app.get("/health", (req, res) => res.send("✅ Server is up and healthy"));

// React app fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Initialize Supabase PostgreSQL tables and start server
initSupabaseDb();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || "development"}`);
});
