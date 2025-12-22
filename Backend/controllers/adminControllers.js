import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

/* ================= USERS ================= */
export const listUsers = async (req, res) => {
  const users = await User.find({}, "name email role createdAt");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    return res.status(400).json({ message: "Admin cannot delete himself" });
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

/* ================= RECRUITERS ================= */
export const listRecruiters = async (req, res) => {
  const recruiters = await User.find({ role: "recruiter" });
  res.json(recruiters);
};

export const deleteRecruiter = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Recruiter deleted" });
};

/* ================= JOBS ================= */
export const listAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("postedBy", "name email");
  res.json(jobs);
};

export const deleteJobAdmin = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
};

/* ================= APPLICATIONS ================= */
export const listApplicationsAdmin = async (req, res) => {
  const applications = await Application.find()
    .populate("job", "title")
    .populate("applicant", "name email");
  res.json(applications);
};

export const deleteApplicationAdmin = async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: "Application deleted" });
};

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const recruiters = await User.countDocuments({ role: "recruiter" });
    const totalJobs = await Job.countDocuments();
    const applications = await Application.countDocuments();

    res.status(200).json({
      totalUsers,
      recruiters,
      totalJobs,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin statistics",
    });
  }
};

