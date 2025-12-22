import express from "express";
import { saveResume, getResumeByEmail, removeResume,previewResume } from "../controllers/ResumeUpload.js";
import { protect } from "../middleware/authMiddlewares.js";

const ResumeRouter = express.Router();

ResumeRouter.post("/saveResume", protect, saveResume);

ResumeRouter.get("/getResume/:email", protect, getResumeByEmail);

ResumeRouter.delete("/deleteResume", protect, removeResume);

ResumeRouter.get("/preview", protect, previewResume);

export default ResumeRouter;
