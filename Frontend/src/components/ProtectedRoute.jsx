
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/signin" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
