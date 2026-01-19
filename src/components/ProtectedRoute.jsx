import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../services/cookies";

const ProtectedRoute = ({ children }) => {
  const token = getCookie("NessasBrokenWorldAuthToken"); // Check for the authentication token

  if (!token) {
    // Redirect to the login page if there's no token
    return <Navigate to="/login" />;
  }

  // Render the children (protected components) if there's a valid token
  return children;
};

export default ProtectedRoute;
