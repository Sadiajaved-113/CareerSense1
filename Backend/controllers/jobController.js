import Job from "../models/Job.js";

/**
 * @desc    Add new job (Recruiter only)
 * @route   POST /api/jobs
 * @access  Recruiter
 */
export const addJob = async (req, res) => {
  try {
    const {
      company,
      title,
      position,
      location,
      description,
      category,
      salary,
    } = req.body;

 
    if (
      !company ||
      !title ||
      !position ||
      !location ||
      !description
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const job = await Job.create({
      company,
      title,
      position,
      location,
      description,
      category,
      salary,
      postedBy: req.user._id, 
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all jobs
 * @route   GET /api/jobs
 * @access  Recruiter, Admin
 */
export const listJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get job by ID
 * @route   GET /api/jobs/:id
 * @access  Recruiter, Admin
 */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email role"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update job
 * @route   PUT /api/jobs/:id
 * @access  Recruiter (own jobs)
 */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const allowedUpdates = [
      "company",
      "title",
      "position",
      "location",
      "description",
      "category",
      "salary",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete job
 * @route   DELETE /api/jobs/:id
 * @access  Recruiter (own jobs)
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne(); 

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecruiterJobCount = async (req, res) => {
  try {
    const count = await Job.countDocuments({
      postedBy: req.user._id,
    });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job count" });
  }
};


