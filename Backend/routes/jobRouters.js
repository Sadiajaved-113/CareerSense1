import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddlewares.js";
import { addJob, listJobs, getJobById, updateJob, deleteJob, getMyJobs } from "../controllers/jobController.js";
import { getRecruiterJobCount } from "../controllers/jobController.js";

const router = express.Router();

// Recruiter
router.post("/", protect, authorizeRoles("recruiter"), addJob);
router.get("/my", protect, authorizeRoles("recruiter"), getMyJobs);
router.put("/:id", protect, authorizeRoles("recruiter"), updateJob);
router.delete("/:id", protect, authorizeRoles("recruiter"), deleteJob);
router.get(
  "/recruiter/count",
  protect,
  authorizeRoles("recruiter"),
  getRecruiterJobCount
);


// Admin
router.get("/all", protect, authorizeRoles("admin"), listJobs);

// Shared
router.get("/:id", protect, authorizeRoles("admin", "recruiter"), getJobById);

export default router;
