import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/Resume/Dashboard";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(`Selected file: ${e.target.files[0]?.name}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      [".pdf", ".doc", ".docx"].some((ext) =>
        droppedFile.name.endsWith(ext)
      )
    ) {
      setFile(droppedFile);
      setMessage(`Selected file: ${droppedFile.name}`);
    } else {
      setMessage("Invalid file type. Only .pdf, .doc, .docx are allowed.");
    }
  };

  const handleNewResume = () => {
    setResult(null);
    setFile(null);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4000/api/resume/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data); 

    } catch (err) {
      console.error(err);
      setMessage("Resume analysis failed. Try again.");
    }

    setLoading(false);
  };

//   useEffect(() => {
//   const checkExistingResume = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:4000/api/preview",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ Resume exists → directly show Dashboard
//       setResult({
//         category: res.data.resume.category,
//         matches: [], // matches will be fetched on new upload
//       });

//     } catch (err) {
//       // ❌ No resume → stay on upload UI
//       console.log("No existing resume found");
//     }
//   };

//   checkExistingResume();
// }, []);

useEffect(() => {
  const loadPreviousResult = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
          "http://localhost:4000/api/resume/ats-result",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResult(res.data); // 🔥 SAME FORMAT AS UPLOAD RESULT
    } catch {
      // No previous resume → show upload UI
    }
  };

  loadPreviousResult();
}, []);



  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-8 pt-20"
      id="atsresume"
      style={{ backgroundImage: "url('/uploadingresume.jpg')" }}
    >
      {!result ? (
        <div className="border-2 border-white w-full max-w-3xl rounded-md bg-gray-50 shadow-md">
          <div className="bg-gray-100 border-b border-blue-400 px-6 py-3 text-gray-700 font-semibold text-sm">
            UPLOAD YOUR RESUME
          </div>

          <div className="flex flex-col items-center justify-center py-10 px-6">
            <div className="mb-6 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6h.1a5 5 0 010 10H7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12v9m0 0l-3-3m3 3l3-3"
                />
              </svg>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full max-w-lg p-10 border-2 border-dashed rounded-lg transition-colors duration-200 text-center ${
                dragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <p className="text-gray-700 font-medium mb-2">
                {file ? `Selected file: ${file.name}` : "Drag & drop your resume here"}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                or choose a file and upload
              </p>

              <div className="flex items-center gap-4 justify-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Choose File
                </label>

                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium shadow-sm disabled:opacity-50"
                >
                  {loading ? "Analyzing..." : "Upload"}
                </button>
              </div>
            </div>

            {message && (
              <p className="mt-4 text-center text-gray-700 font-medium">
                {message}
              </p>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Accepted formats: <span className="font-medium">.pdf, .doc, .docx</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Dashboard result={result} handleNewResume={handleNewResume} />
      )}
    </div>
  );
};

export default ResumeUpload;
