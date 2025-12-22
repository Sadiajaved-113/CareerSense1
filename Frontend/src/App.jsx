
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ResumeUpload from "./pages/ResumeUpload";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import AddJob from "./pages/recruiter/AddJob";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import EditJob from "./pages/recruiter/EditJob";
import Applicants from "./pages/recruiter/Applicants";
import UserDashboard from "./pages/user/UserDashboard";
import ManageJobs from "./pages/admin/ManageJobs";

import ManageRecruiters from "./pages/admin/ManageRecruiters";
import ManageApplications from "./pages/admin/ManageApplications";

import Footer from "./components/Footer";
import HelpSection from "./components/Helpsection";
import Landingpage from "./components/Landingpage";
import Navbar from "./components/Navbar"; 

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const isDashboardRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/recruiter");

  return (
    <>
      {/* Public Navbar */}
      {!isDashboardRoute && <Landingpage />}

      {/* Admin / Recruiter Navbar */}
      {isDashboardRoute && user && (
        <Navbar userName={user.name} />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* User */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute role="user">
              <ResumeUpload />
            </ProtectedRoute>
          }
        />
        <Route
        path="/user/dashboard"
        element={
        <ProtectedRoute role="user">
          <UserDashboard />
          </ProtectedRoute>
        }
        />

        {/* Recruiter */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
        path="/recruiter/add-job"
        element={
        <ProtectedRoute role="recruiter">
          <AddJob />
       </ProtectedRoute>
      }
      />
      <Route
      path="/recruiter/jobs"
      element={
      <ProtectedRoute role="recruiter">
        <RecruiterJobs />
      </ProtectedRoute>
     }
    />
    <Route
    path="/recruiter/edit-job/:id"
    element={
    <ProtectedRoute role="recruiter">
      <EditJob />
    </ProtectedRoute>
   }
  />

<Route
  path="/recruiter/applicants/:jobId"
  element={
    <ProtectedRoute role="recruiter">
      <Applicants />
    </ProtectedRoute>
  }
/>
      

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/users"
        element={
        <ProtectedRoute role="admin">
          <ManageUsers />
        </ProtectedRoute>
      }
      />
      <Route
      path="/admin/jobs"
      element={
      <ProtectedRoute role="admin">
        <ManageJobs />
        </ProtectedRoute>
      }
      />
      <Route
  path="/admin/recruiter"
  element={
    <ProtectedRoute role="admin">
      <ManageRecruiters />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/applications"
  element={
    <ProtectedRoute role="admin">
      <ManageApplications />
    </ProtectedRoute>
  }
/>

      

      </Routes>

      {location.pathname === "/" && <HelpSection />}
      <Footer />
    </>
  );
};

export default App;

