
import Resume from "../models/Resume.js";
import path from "path";
import fs from "fs";

export const viewResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume || !resume.resumePath) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const absolutePath = path.resolve(resume.resumePath);

    return res.sendFile(absolutePath);

  } catch (error) {
    console.error("View resume error:", error);
    res.status(500).json({ message: "Failed to load resume" });
  }
};
