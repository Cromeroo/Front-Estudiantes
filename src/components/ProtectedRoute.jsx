import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token, renderiza el componente hijo (la ruta protegida)
  return children;
};

export default ProtectedRoute;
