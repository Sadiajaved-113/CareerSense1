import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddlewares.js";
import { analyzeResume } from "../controllers/resumeAnalysisController.js";


const router = express.Router();
const upload = multer();

router.post("/resume/analyze", protect, upload.single("resume"), analyzeResume);

export default router;
