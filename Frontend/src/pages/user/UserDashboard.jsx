import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../../components/user/ProfileCard";
import MyApplications from "../../components/user/MyApplications";

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        User Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <ProfileCard user={user} />

        <div className="lg:col-span-2">
          <MyApplications applications={applications} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
