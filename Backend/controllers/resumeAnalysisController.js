import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { extractTextFromPDF } from "../utils/pdfExtractor.js";
import { preprocessText } from "../utils/nlpUtils.js";
import { predictCategory } from "../utils/categoryPredictor.js";
import { calculateATSScore } from "../utils/atsScorer.js";
import { loadDataset } from "../utils/datasetLoader.js";


let DATASET = null;

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);
    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({ message: "Invalid resume content" });
    }

    const tokens = preprocessText(resumeText);

    if (!DATASET) {
      DATASET = await loadDataset();
    }

    const category = predictCategory(tokens, DATASET);

    await Resume.findOneAndUpdate(
      { user: req.user._id },
      {
        resumeText,
        category,
        analyzedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    const jobs = await Job.find({
      $or: [
        { category: { $regex: category, $options: "i" } },
        { title: { $regex: category, $options: "i" } },
        { description: { $regex: category, $options: "i" } },
      ],
    });

    const matches = jobs
      .map(job => {
        const atsScore = calculateATSScore(resumeText, job.description);
        return { job, atsScore };
      })
      .filter(item => item.atsScore > 0) 
      .sort((a, b) => b.atsScore - a.atsScore);

    return res.status(200).json({
      success: true,
      category,
      matches,
      totalJobsAnalyzed: jobs.length,
    });

  } catch (error) {
    console.error("Resume analysis error:", error);
    return res.status(500).json({
      success: false,
      message: "Resume analysis failed",
    });
  }
};

