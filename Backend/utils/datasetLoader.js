import fs from "fs";
import path from "path";
import csv from "csv-parser";

export const loadDataset = () => {
  return new Promise((resolve, reject) => {
    const dataset = [];

    const datasetPath = path.join(
      process.cwd(),
      "dataset",
      "ResumeDataset.csv" 
    );

    if (!fs.existsSync(datasetPath)) {
      return reject(
        new Error("❌ resumeDataset.csv not found in Backend/dataset/")
      );
    }

    fs.createReadStream(datasetPath)
      .pipe(
        csv({
          mapHeaders: ({ header }) =>
            header.replace(/^\uFEFF/, "").trim().toLowerCase(),
        })
      )
      .on("data", (row) => {
        const category = row.category?.trim();
        const resume = row.resume?.trim();

        if (category && resume) {
          dataset.push({
            category,
            resume, 
          });
        }
      })
      .on("end", () => {
        if (dataset.length === 0) {
          return reject(
            new Error(
              "❌ Dataset loaded but no valid rows found. Check CSV headers and content."
            )
          );
        }

        console.log(`✅ Dataset loaded: ${dataset.length} records`);
        resolve(dataset);
      })
      .on("error", (err) => reject(err));
  });
};
