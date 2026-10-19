// import mongoose from "mongoose";

// const ResumeSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     resumeText: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//     },
//     resumeFile: {
//   type: String,
//   required: true
// },

//   },
//   { timestamps: true }
// );

// export default mongoose.model("Resume", ResumeSchema);

import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    resumePath: {
      type: String,
      required: true, // e.g. uploads/resumes/abc.pdf
    },

    category: String,

    matches: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        atsScore: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
