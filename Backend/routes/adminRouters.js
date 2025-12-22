import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddlewares.js";
import {
  listUsers,
  deleteUser,
  listRecruiters,
  deleteRecruiter,
  listAllJobs,
  deleteJobAdmin,
  listApplicationsAdmin,
  deleteApplicationAdmin,
} from "../controllers/adminControllers.js";
import { getAdminStats } from "../controllers/adminControllers.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/users", listUsers);
router.delete("/users/:id", deleteUser);

router.get("/recruiters", listRecruiters);
router.delete("/recruiters/:id", deleteRecruiter);

router.get("/jobs", listAllJobs);
router.delete("/jobs/:id", deleteJobAdmin);

router.get("/applications", listApplicationsAdmin);
router.delete("/applications/:id", deleteApplicationAdmin);


router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);


export default router;
