import React from "react";

const ProfileCard = ({ user }) => {
  const avatarLetter = user?.name?.charAt(0).toUpperCase();

  const openResume = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/resume/view",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch resume");
      }

      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error(error);
      alert("Unable to open resume");
    }
  };

  return (
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
  );
};

export default ProfileCard;
