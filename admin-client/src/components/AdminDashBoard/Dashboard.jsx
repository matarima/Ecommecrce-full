import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InfoBoard from "./InforBoard";
import Orders from "./Orders";
import axios from "../../utils/axiosConfig";
import "./Dashboard.css";

const Dashboard = () => {
  const [clients, setClients] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clients, earnings, and new orders count
        const { data } = await axios.get("/admin/stats");
        setClients(data.clients);
        setEarnings(data.earnings);
        setNewOrders(data.newOrders);

        // Fetch recent orders
        const { data: ordersData } = await axios.get("/admin/orders");
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <InfoBoard clients={clients} earnings={earnings} newOrders={newOrders} />
        <Orders orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
