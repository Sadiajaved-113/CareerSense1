import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(""); // state for success message
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/signin");
      return;
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Unauthorized or server error");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessage("User deleted successfully!"); 
      setTimeout(() => setMessage(""), 3000); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td className="border p-3">{u.name}</td>
                  <td className="border p-3">{u.email}</td>
                  <td className="border p-3 capitalize">{u.role}</td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
