import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/admin/recruiters",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRecruiters(res.data);
  };

  const deleteRecruiter = async (id) => {
    if (!window.confirm("Delete this recruiter?")) return;

    await axios.delete(
      `http://localhost:4000/api/admin/recruiters/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setRecruiters(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Recruiters</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map(r => (
            <tr key={r._id}>
              <td className="border p-3">{r.name}</td>
              <td className="border p-3">{r.email}</td>
              <td className="border p-3 text-center">
                <button
                  onClick={() => deleteRecruiter(r._id)}
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

export default ManageRecruiters;
