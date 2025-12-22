import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    resumeText: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    resumeFile: {
  type: String,
  required: true
},

  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
