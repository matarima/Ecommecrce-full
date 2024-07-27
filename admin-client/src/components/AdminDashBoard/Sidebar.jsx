import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig"; // Import axios
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async  () => {
    try {
      await axios.post("/auth/logout"); // Gọi API logout
      navigate("/login"); // Điều hướng đến trang login sau khi logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="sidebar bg-light">
      <h2 className="text-center mt-3">Admin Panel</h2>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orders">Orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin-chat">Admin Chat</Link>
        </li>
      </ul>
      <li className="nav-item mt-5">
          <button className="btn btn-danger btn-block" onClick={handleLogout}>
            Logout
          </button>
        </li>
    </div>
  );
};

export default Sidebar;
