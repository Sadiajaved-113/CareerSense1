import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileCard = ({ user }) => {
  const avatarLetter = user?.name?.charAt(0).toUpperCase();
  const token = localStorage.getItem("token");

  const [showResume, setShowResume] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const fetchResume = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/preview", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumeData(res.data.resume);
    } catch (err) {
      console.error(err);
    }
  };

  const openResume = async () => {
    if (!resumeData) await fetchResume();
    setShowResume(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
          {avatarLetter}
        </div>

        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user.name}
        </h2>
        <p className="text-gray-500 text-sm">{user.email}</p>

        {/* Resume Section */}
        <div className="mt-6 w-full border-t pt-4 text-center">
          <p className="text-sm text-gray-600 font-medium mb-2">
            Resume Status
          </p>

          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            Uploaded
          </span>

          <button
            onClick={openResume}
            className="block w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Resume
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showResume && resumeData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowResume(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Resume Analysis Preview
            </h2>

            <p className="mb-2">
              <strong>Match Rate:</strong> {resumeData.matchRate}%
            </p>

            <p className="mb-4">
              <strong>Predicted Category:</strong>{" "}
              <span className="text-blue-600 font-semibold">
                {resumeData.category || "N/A"}
              </span>
            </p>

            <h3 className="font-semibold mb-2">Key ATS Checks</h3>
            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
              {resumeData.checks?.map((c, i) => (
                <li key={i}>
                  <strong>{c.title}:</strong> {c.message}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4 mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.keywords?.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
