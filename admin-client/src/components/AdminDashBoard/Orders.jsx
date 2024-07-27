import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = ({ orders }) => {
  const navigate = useNavigate();

  const handleViewDetails = (order) => {
    navigate("/order-details", { state: { order } });
  };
  return (
    <div className="orders">
      <h2>History</h2>
      <table className="table table-bordered table-hover mt-3">
        <thead className="thead-light">
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user}</td>
              <td>{order.customerName}</td>
              <td>{order.customerPhone}</td>
              <td>{order.customerAddress}</td>
              <td>{order.totalPrice.toLocaleString()}</td>
              <td>{order.orderStatus}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleViewDetails(order)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
