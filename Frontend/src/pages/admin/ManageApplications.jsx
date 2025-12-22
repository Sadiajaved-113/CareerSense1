import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/admin/applications",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setApplications(res.data);
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    await axios.delete(
      `http://localhost:4000/api/admin/applications/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setApplications(prev => prev.filter(a => a._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Applications</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Candidate</th>
            <th className="p-3 border">Job</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td className="border p-3">{app.applicant?.name}</td>
              <td className="border p-3">{app.job?.title}</td>
              <td className="border p-3 capitalize">{app.status}</td>
              <td className="border p-3 text-center">
                <button
                  onClick={() => deleteApplication(app._id)}
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

export default ManageApplications;
