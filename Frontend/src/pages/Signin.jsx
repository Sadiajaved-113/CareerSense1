
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      const user = JSON.parse(savedUser);
      redirectByRole(user.role);
    }
  }, []);

  const redirectByRole = (role) => {
    if (role === "admin") navigate("/admin/dashboard", { replace: true });
    else if (role === "recruiter") navigate("/recruiter/dashboard", { replace: true });
    else if (role === "user") navigate("/user/dashboard", { replace: true });
    else navigate("/upload", { replace: true });
  };

  const handleSubmit = async () => {
    const data = { email, password };

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      redirectByRole(res.data.role);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-cover bg-center pt-[120px]" style={{ backgroundImage: "url('/resume.jpg')" }}>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Log in to <span className="text-blue-600">Career</span><span className="text-green-600">Sense</span>
        </h2>

        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} autoComplete="off" className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-2">Log In</button>
        <p className="text-red-500 text-sm text-center">{message}</p>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
