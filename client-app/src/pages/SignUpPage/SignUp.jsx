import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const userArr = JSON.parse(localStorage.getItem("userArr")) || [];

    const isEmailExist = userArr.some((user) => user.email === email);
    if (isEmailExist) {
      setError("Email already exists.");
      return;
    }

    try {
      axios
        .post("/auth/register", { username, email, password, phone })
        .then((response) => {
          navigate("/login");
          console.log("User registered:", response.data);
        });
    } catch (error) {
      setError("Failed to sign up.");
    }
  };

  return (
    <div className="image-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="form-style">
              <h2 className="title text-center">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
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
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                SIGN UP
              </button>
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
