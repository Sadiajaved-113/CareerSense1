import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/careerlogo.png";

export default function Landingpage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      localStorage.removeItem("user");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  if (authLoading) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const renderAvatar = () =>
    user?.name ? (
      <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>
    ) : null;

  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "recruiter") return "/recruiter/dashboard";
    return "/user/dashboard";
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow h-[70px]">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Career Sense"
            className="w-[60px] h-[60px] object-contain"
          />
          <span className="text-blue-600 font-bold text-xl">Career</span>
          <span className="text-emerald-600 font-bold text-xl">Sense</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-6">

          {user ? (
            <>
              <Link
                to={getDashboardLink()}
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>

              {user.role === "user" && (
                <Link
                  to="/upload"
                  className="font-medium text-gray-700 hover:text-blue-600"
                >
                  ATS Resume
                </Link>
              )}

              {renderAvatar()}

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <nav className="flex items-center gap-6 text-gray-700 font-medium">
                <a href="#home" className="hover:text-blue-600">Home</a>
                <a href="#products" className="hover:text-blue-600">Products</a>
              </nav>

              <Link to="/signup" className="hover:underline">
                Join now
              </Link>

              <Link
                to="/signin"
                className="px-4 py-2 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-50"
              >
                Sign in
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden mt-[70px] bg-white shadow flex flex-col items-center gap-4 py-4">
          {user ? (
            <>
              <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">Join now</Link>
              <Link to="/signin">Sign in</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
