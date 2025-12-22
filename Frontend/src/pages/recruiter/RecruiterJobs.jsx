import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/jobs/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data));
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await axios.delete(`http://localhost:4000/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(jobs.filter((j) => j._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">My Posted Jobs</h1>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-xl shadow flex justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                {job.company} • {job.location}
              </p>
              <p className="text-sm text-gray-500">
                Category: {job.category || "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  navigate(`/recruiter/applicants/${job._id}`)
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Applicants
              </button>

              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterJobs;
