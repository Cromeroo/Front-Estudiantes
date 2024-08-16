import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://back-estudiantes.onrender.com/api/auth/login",
        { email, password }
      );
      setMessage("Login successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/consulta");
    } catch (error) {
      setMessage("Login failed: " + error.response.data.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://back-estudiantes.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      setMessage("Registration successful! Please login.");
      setIsRegister(false);
    } catch (error) {
      setMessage("Registration failed: " + error.response.data.error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
          {message && (
            <div className="mt-3 text-center text-danger">{message}</div>
          )}
        </form>
        <div className="mt-3 text-center">
          {isRegister ? (
            <>
              <p>Already have an account?</p>
              <button
                className="btn btn-link"
                onClick={() => setIsRegister(false)}
              >
                Login here
              </button>
            </>
          ) : (
            <>
              <p>Don't have an account?</p>
              <button
                className="btn btn-link"
                onClick={() => setIsRegister(true)}
              >
                Register here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
