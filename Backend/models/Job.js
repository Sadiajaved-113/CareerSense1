import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company : { type: String, required: true },
    title: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String }, 
    salary: { type: Number },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
