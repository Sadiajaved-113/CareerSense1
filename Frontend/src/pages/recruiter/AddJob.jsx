import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [job, setJob] = useState({
    company: "",
    title: "",
    position: "",
    location: "",
    description: "",
    category: "",
    salary: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/jobs", job, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Job posted successfully");
      setTimeout(() => navigate("/recruiter/jobs"), 1200);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Post New Job
        </h1>

        {message && (
          <div className="mb-4 text-center p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["company", "Company Name"],
            ["title", "Job Title"],
            ["position", "Position"],
            ["location", "Location"],
            ["category", "Category (Frontend / UI-UX etc)"],
            ["salary", "Salary"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={job[name]}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400"
              required={["company","title","position","location"].includes(name)}
            />
          ))}

          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
