import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connectDB } from './config/db.js';
import userRouters from './routes/userRouters.js';
import ResumeRouter from './routes/resume.js';
// import ats from './routes/ats.js';
import JobRouter from './routes/jobRouters.js';
import AdminRouter from './routes/adminRouters.js';
import recruiterRoutes from './routes/recruiterRoutes.js';
import { upload_folder } from './lib/Upload_Folder.js';
import resumeAnalysisRoutes from './routes/resumeAnalysisRoutes.js';
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();
const PORT = 4000;

app.use(cors());
connectDB();
app.use(express.json());

app.use("/api/auth", userRouters);
// app.use("/api", ats);
app.use("/api", ResumeRouter);
app.use("/api", resumeAnalysisRoutes);
app.use("/api/applications", applicationRoutes);

// New routes
app.use("/api/jobs", JobRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/recruiter", recruiterRoutes);
app.use("/uploads", express.static("uploads"));


app.get('/', (req, res) => {
  res.send("API working");
});

upload_folder();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
