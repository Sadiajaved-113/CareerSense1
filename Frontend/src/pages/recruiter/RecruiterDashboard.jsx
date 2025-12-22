import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecruiterDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/applications/recruiter",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(res.data || []);
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchJobCount = async () => {
  const res = await axios.get(
    "http://localhost:4000/api/jobs/recruiter/count",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  setJobCount(res.data.count);
};
useEffect(() => {
  fetchApplications();
  fetchJobCount();
}, []);



  // ✅ Applications for THIS recruiter are already filtered by backend
  const totalApplications = applications.length;

  // ✅ Only pending applications on recruiter’s jobs
  const activeApplications = applications.filter(
    (app) => app.status === "pending"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Recruiter Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage job postings and review applications
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Active Job Posts</p>
          <h2 className="text-3xl font-semibold text-gray-800 mt-2">
            {jobCount}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Applications</p>
          <h2 className="text-3xl font-semibold text-gray-800 mt-2">
            {totalApplications}
          </h2>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Link to="/recruiter/add-job">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Post New Job
          </button>
        </Link>

        <Link to="/recruiter/jobs">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
            My Posted Jobs
          </button>
        </Link>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-600">No applications received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="py-3">Candidate</th>
                  <th>Job Title</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3">
                      <div className="font-medium">
                        {app.applicant?.name || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.applicant?.email || "N/A"}
                      </div>
                    </td>

                    <td>{app.job?.title || "N/A"}</td>

                    <td>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-semibold
                          ${
                            app.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : app.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {(app.status || "pending").toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
