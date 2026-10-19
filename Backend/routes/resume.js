import express from "express";
import { protect } from "../middleware/authMiddlewares.js";
import { viewResume } from "../controllers/viewResumeController.js";
import { getMyATSResult } from "../controllers/ResumeUpload.js";

const router = express.Router();

// ATS result
router.get("/resume/ats-result", protect, getMyATSResult);

// View uploaded resume file
router.get("/resume/view", protect, viewResume);

export default router;
