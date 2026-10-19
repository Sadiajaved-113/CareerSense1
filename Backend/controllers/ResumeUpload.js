import Resume from "../models/Resume.js";
import Job from "../models/Job.js";

export const getMyATSResult = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id }).populate(
      "matches.job"
    );

    if (!resume) {
      return res.status(404).json({ message: "No ATS result found" });
    }

    res.status(200).json({
      category: resume.category,
      matches: resume.matches.map(m => ({
        job: m.job,
        atsScore: m.atsScore,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load ATS result" });
  }
};
