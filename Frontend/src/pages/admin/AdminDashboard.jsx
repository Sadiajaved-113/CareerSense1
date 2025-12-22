import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    recruiters: 0,
    totalJobs: 0,
    applications: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load admin stats", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          System overview and management
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Recruiters" value={stats.recruiters} />
        <StatCard title="Total Jobs" value={stats.totalJobs} />
        <StatCard title="Applications" value={stats.applications} />
      </div>

      {/* Admin Actions */}
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Admin Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link to="/admin/users">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition">
              Manage Users
            </button>
          </Link>

          <Link to="/admin/recruiters">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition">
              Manage Recruiters
            </button>
          </Link>

          <Link to="/admin/jobs">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition">
              Manage Jobs
            </button>
          </Link>

          <Link to="/admin/applications">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition">
              View Applications
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

/* Reusable stat card */
const StatCard = ({ title, value }) => (
  <div className="bg-white border rounded-lg p-6 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-3xl font-semibold text-gray-800 mt-2">
      {value}
    </h2>
  </div>
);

export default AdminDashboard;
