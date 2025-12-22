import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddlewares.js";
import Job from "../models/Job.js";

const router = express.Router();

// POST /api/recruiter/jobs
router.post("/jobs", protect, authorizeRoles("recruiter"), async (req, res) => {
  const { company, title, description, category, salary } = req.body;

  try {
    const job = new Job({
      company,
      title,
      description,
      category,
      salary,
      postedBy: req.user._id,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
