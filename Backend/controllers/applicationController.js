import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";


export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) {
      return res.status(400).json({
        message: "Please upload and analyze resume first",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume: resume._id,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({ message: "Failed to apply for job" });
  }
};


export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job", "title company position location")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get my applications error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};


export const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email")
      .populate("resume")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get job applications error:", error);
    res.status(500).json({ message: "Failed to load applications" });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Application ${status}`,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

export const getApplicationsForRecruiter = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const applications = await Application.find()
      .populate({
        path: "job",
        match: { postedBy: recruiterId }, 
        select: "title",
      })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    const filtered = applications.filter(app => app.job);

    res.status(200).json(filtered);
  } catch (error) {
    console.error("Recruiter dashboard error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
