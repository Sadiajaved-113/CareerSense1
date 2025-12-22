import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddlewares.js";
import {applyForJob,getMyApplications,getJobApplications,updateApplicationStatus,getApplicationsForRecruiter,} from "../controllers/applicationController.js";

const router = express.Router();

// USER
router.post(
  "/apply/:jobId",
  protect,
  authorizeRoles("user"),
  applyForJob
);

router.get(
  "/my",
  protect,
  authorizeRoles("user"),
  getMyApplications
);

// RECRUITER – applications for a specific job
router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("recruiter"),
  getJobApplications
);

// RECRUITER – approve / reject
router.put(
  "/:id/status",
  protect,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);

// RECRUITER – all applications (dashboard)
router.get(
  "/recruiter",
  protect,
  authorizeRoles("recruiter"),
  getApplicationsForRecruiter
);



export default router;
