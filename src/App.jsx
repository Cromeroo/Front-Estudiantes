import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsultaEstudiantes from "./components/ConsultaEstudiantes";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/consulta"
          element={
            <ProtectedRoute>
              <ConsultaEstudiantes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
