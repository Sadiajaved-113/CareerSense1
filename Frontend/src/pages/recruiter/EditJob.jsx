import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch(() => navigate("/recruiter/jobs"));
  }, []);

  const handleChange = (e) =>
    setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/jobs/${id}`, job, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/recruiter/jobs");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Edit Job</h2>

        {["company","title","position","location","category","salary"].map((f) => (
          <input
            key={f}
            name={f}
            value={job[f] || ""}
            onChange={handleChange}
            placeholder={f.toUpperCase()}
            className="w-full border p-3 rounded"
          />
        ))}

        <textarea
          name="description"
          value={job.description || ""}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded"
        />

        <button className="w-full py-3 bg-blue-600 text-white rounded-lg">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
