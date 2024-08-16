import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConsultaEstudiantes = () => {
  const [documento, setDocumento] = useState("");
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    navigate("/"); // Redirige al login
  };

  const validarDocumento = (doc) => {
    if (!/^\d{6,10}$/.test(doc)) {
      return "El número de documento debe tener entre 6 y 10 dígitos y solo debe contener números.";
    }

    const isSequential = (str) => {
      return /^(\d)\1+$/.test(str) || /^(\d{2,})\1+$/.test(str);
    };

    if (isSequential(doc)) {
      return "El número de documento no puede contener secuencias repetidas (por ejemplo, 111111 o 123123).";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validarDocumento(documento);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token, autorización denegada.");
        return;
      }

      const response = await axios.get(
        `https://back-estudiantes.onrender.com/api/estudiantes/${documento}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setResultado(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al consultar la API.");
      setResultado(null);
    }
  };

  return (
    <div className="container mt-5 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Consulta de Estudiantes Aprobados</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Número de Documento</label>
          <input
            type="text"
            className="form-control bg-dark text-white"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mt-3">
          Consultar
        </button>
      </form>

      {resultado && (
        <div className="mt-4">
          <h3>Resultado:</h3>
          <p>
            <strong>Nombre Completo:</strong> {resultado.nombre}
          </p>
          <p>
            <strong>Documento:</strong> {resultado.documento}
          </p>
          <p>
            <strong>Email:</strong> {resultado.email}
          </p>
          <p>
            <strong>Curso:</strong> {resultado.curso}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsultaEstudiantes;
