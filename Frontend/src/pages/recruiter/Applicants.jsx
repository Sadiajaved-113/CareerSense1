import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CheckCircle, XCircle, FileText } from "lucide-react";

const Applicants = () => {
  const { jobId } = useParams();
  const token = localStorage.getItem("token");

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/applications/job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/applications/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApps((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );

      setMessage(
        status === "approved"
          ? "✅ Candidate approved successfully"
          : "❌ Candidate rejected"
      );

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Job Applicants
      </h1>

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded-lg shadow">
          {message}
        </div>
      )}

      {apps.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
          No applications received yet.
        </div>
      ) : (
        <div className="space-y-6">
          {apps.map((app) => {
            if (!app.applicant) return null;

            return (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {app.applicant.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {app.applicant.email}
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateStatus(app._id, "approved")
                      }
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app._id, "rejected")
                      }
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                  </div>
                </div>

                {/* RESUME VIEWER */}
                {app.resume?.resumeFile && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                      <FileText size={18} />
                      Resume Preview
                    </div>

                    <iframe
                      src={`http://localhost:4000/${app.resume.resumeFile}`}
                      title="Resume PDF"
                      className="w-full h-[500px] border rounded-lg"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applicants;
