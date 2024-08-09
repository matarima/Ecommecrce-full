import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../AdminDashBoard/Sidebar";
import "./OrderDetails.css";

const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state;

  return (
    <div className="container order-details">
      <Sidebar />
      <div className="main-content">
        <h2>Order Details</h2>
        <div className="order-info">
          <p>
            <strong>User ID:</strong> {order.user}
          </p>
          <p>
            <strong>Name:</strong> {order.customerName}
          </p>
          <p>
            <strong>Phone:</strong> {order.customerPhone}
          </p>
          <p>
            <strong>Address:</strong> {order.customerAddress}
          </p>
          <p>
            <strong>Total:</strong> {order.totalPrice.toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {order.orderStatus}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}
          </p>
        </div>
        <h3>Products</h3>
        <table className="table table-bordered table-hover mt-3">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.quantity}</td>
                <td>
                  <img
                    src={`https://backend-ecommecre.onrender.com${product.img1}`}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
