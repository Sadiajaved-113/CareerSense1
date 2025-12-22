import React from "react";
import axios from "axios";

const Dashboard = ({ result, handleNewResume }) => {
  const hasJobs = result.matches && result.matches.length > 0;
  const topScore = hasJobs ? result.matches[0].atsScore : null;

 const handleApply = async (jobId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `http://localhost:4000/api/applications/apply/${jobId}`,
      {}, // body is EMPTY
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Applied successfully");
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Failed to apply");
  }
};


  return (
    <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Resume Scan Results
        </h2>
        <button
          onClick={handleNewResume}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Upload New Resume
        </button>
      </div>

      <div className="flex gap-8">
        {/* LEFT */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />

              {hasJobs && (
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#16a34a"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={
                    2 * Math.PI * 60 * (1 - topScore / 100)
                  }
                  strokeLinecap="round"
                  transform="rotate(-90 64 64)"
                />
              )}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {hasJobs ? `${topScore}%` : "N/A"}
            </div>
          </div>

          <p className="mt-4 text-gray-600 font-medium">
            {hasJobs ? "Best Job Match" : "No Job Match"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Predicted Category:
            <span className="font-semibold ml-1">
              {result.category}
            </span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recommended Jobs
          </h3>

          {!hasJobs ? (
            <div className="p-6 border rounded-md bg-gray-50 text-center">
              <p className="text-gray-700 font-medium">
                No matching jobs found for your resume.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try uploading a different resume or check back later when new jobs are posted.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {result.matches.map((item, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.job.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.job.company} • {item.job.location}
                    </p>
                    <p className="text-xs text-gray-500">
                      Category: {item.job.category}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      {item.atsScore}%
                    </span>

                    {/* APPLY BUTTON */}
                    <button
                      onClick={() => handleApply(item.job._id)}
                      className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
