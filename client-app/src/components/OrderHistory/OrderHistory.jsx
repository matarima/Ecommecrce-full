import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axiosConfig';
import UserContext from '../../utils/UserContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`/orders/${user._id}`)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the orders!", error);
        });
    }
  }, [user]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="order-history container mt-5">
      <h1 className="text-center mb-5">Order History</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Order</th>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user}</td>
              <td>{order.customerName}</td>
              <td>{order.customerPhone}</td>
              <td>{order.customerAddress}</td>
              <td>{order.totalPrice.toLocaleString()} VND</td>
              <td>{order.delivery || 'N/A'}</td>
              <td>{order.orderStatus}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleViewOrder(order)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="order-details mt-5">
          <h2 className="text-center mb-5">Information Order</h2>
          <div className="mb-4">
            <p>ID User: {selectedOrder.user}</p>
            <p>Full Name: {selectedOrder.customerName}</p>
            <p>Phone: {selectedOrder.customerPhone}</p>
            <p>Address: {selectedOrder.customerAddress}</p>
            <p>Total: {selectedOrder.totalPrice.toLocaleString()} VND</p>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID Product</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <img src={`https://backend-ecommecre.onrender.com${product.img1}`} alt={product.name} className="order-image" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} VND</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
