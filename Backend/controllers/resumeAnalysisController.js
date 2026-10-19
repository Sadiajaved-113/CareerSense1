import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { extractTextFromPDF } from "../utils/pdfExtractor.js";
import { preprocessText } from "../utils/nlpUtils.js";
import { predictCategory } from "../utils/categoryPredictor.js";
import { calculateATSScore } from "../utils/atsScorer.js";
import { loadDataset } from "../utils/datasetLoader.js";
import fs from "fs";
import path from "path";

let DATASET = null;

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    /* ================================
       1️⃣ SAVE RESUME FILE
    ================================= */
    // const uploadDir = path.join("uploads", "resumes");

    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    // const fileName = `${req.user._id}-${Date.now()}.pdf`;
    // const filePath = path.join(uploadDir, fileName);

    // fs.writeFileSync(filePath, req.file.buffer);

    const uploadDir = path.join("uploads", "resumes");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileName = `${req.user._id}-${Date.now()}.pdf`;
const filePath = path.join(uploadDir, fileName);

fs.writeFileSync(filePath, req.file.buffer);

    /* ================================
       2️⃣ ANALYZE RESUME
    ================================= */
    const resumeText = await extractTextFromPDF(req.file.buffer);
    const tokens = preprocessText(resumeText);

    if (!DATASET) {
      DATASET = await loadDataset();
    }

    const category = predictCategory(tokens, DATASET);

    const jobs = await Job.find({
      $or: [
        { category: { $regex: category, $options: "i" } },
        { title: { $regex: category, $options: "i" } },
      ],
    });

    const matches = jobs
      .map(job => ({
        job: job._id,
        atsScore: calculateATSScore(resumeText, job.description),
      }))
      .filter(m => m.atsScore > 0)
      .sort((a, b) => b.atsScore - a.atsScore);

    /* ================================
       3️⃣ STORE RESULT + FILE PATH
    ================================= */
    await Resume.findOneAndUpdate(
      { user: req.user._id },
      {
        category,
        matches,
        resumePath: filePath,
      },
      { upsert: true, new: true }
    );

    /* ================================
       4️⃣ RESPONSE
    ================================= */
    res.status(200).json({
      category,
      matches,
    });

  } catch (error) {
    console.error("Resume analysis error:", error);
    res.status(500).json({ message: "Resume analysis failed" });
  }
};

