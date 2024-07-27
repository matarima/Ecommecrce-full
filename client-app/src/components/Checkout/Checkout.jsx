import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import UserContext from "../../utils/UserContext";
import "./Checkout.css";

const Checkout = () => {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const cart = useSelector((state) => state.cart.listCart);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      userId: user._id,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phoneNumber,
      customerAddress: formData.address,
      products: cart,
      totalPrice: total,
    };

    try {
      const response = await axios.post("/orders", orderData);
      console.log("Order placed:", response.data);
      navigate("/thank-you");
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center">CHECKOUT</h1>
      <div className="row">
        <div className="col-md-8">
          <h2>BILLING DETAILS</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>FULL NAME:</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter Your Full Name Here!"
                required
              />
            </div>
            <div className="form-group">
              <label>EMAIL:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email Here!"
                required
              />
            </div>
            <div className="form-group">
              <label>PHONE NUMBER:</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Your Phone Number Here!"
                required
              />
            </div>
            <div className="form-group">
              <label>ADDRESS:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Your Address Here!"
                required
              />
            </div>
            <button type="submit" className="btn btn-dark btn-block mt-4">Place order</button>
          </form>
        </div>
        <div className="col-md-4">
          <h2>YOUR ORDER</h2>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li className="list-group-item d-flex justify-content-between lh-condensed" key={item._id}>
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">{item.price.toLocaleString()} VND x {item.quantity}</small>
                </div>
                <span className="text-muted">{(item.price * item.quantity).toLocaleString()} VND</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (VND):</span>
              <strong>{total.toLocaleString()} VND</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
