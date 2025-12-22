import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/admin/jobs",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setJobs(res.data);
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await axios.delete(
      `http://localhost:4000/api/admin/jobs/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setJobs(prev => prev.filter(j => j._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Jobs</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Company</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id}>
              <td className="border p-3">{job.title}</td>
              <td className="border p-3">{job.company}</td>
              <td className="border p-3 text-center">
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageJobs;
