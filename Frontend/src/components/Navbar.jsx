import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/careerlogo.png";

const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md">
      <div className="flex items-center gap-2">
        <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-1">
                    <img 
                     src={logo}
                     alt="Career Sense Logo" 
                     className="w-[80px] h-[80px] mt-[-10px] ml-10 rounded-full object-contain"
                   />
                    <span className="text-blue-600 mt-3 ml-[-4px]">Career</span>
                    <span className="text-emerald-600 mt-3">Sense</span>
                  </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {userName?.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
