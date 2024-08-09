import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import UserContext from "../../utils/UserContext";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await axios.post("/auth/login", { email, password });
      const token = response.data.token; // Lấy token từ phản hồi
      const user = response.data.user;
      
      if (user.role !== "admin" && user.role !== "consultant") {
        setError("Unauthorized access.");
        return;
      }
  
      localStorage.setItem("token", token); // Lưu token vào localStorage
      login(user);
  
      if (user.role === "consultant") {
        navigate("/admin-chat"); // Điều hướng consultant đến /admin-chat
      } else {
        navigate("/dashboard"); // Điều hướng admin đến /dashboard
      }
    } catch (error) {
      setError("Invalid email or password.");
    }
  };
  
  return (
    <div className="image-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="form-style">
              <h2 className="mb-3 card-title text-center">Admin Sign In</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                SIGN IN
              </button>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
