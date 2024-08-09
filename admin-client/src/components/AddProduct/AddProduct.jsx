import React, { useState } from "react";
import axios from "../../utils/axiosConfig";
import Sidebar from "../AdminDashBoard/Sidebar";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    short_desc: "",
    long_desc: "",
    images: [],
    count: 0,
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, images: e.target.files });
  };

  const handleBack = () => {
    navigate("/products");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.images.length < 4) {
      setMessage("Please upload at least 4 images.");
      return;
    }

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < product.images.length; i++) {
          formData.append("images", product.images[i]);
        }
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
      const response = await axios.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/products");
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <Sidebar />
      <h2 className="mb-4 text-center">Add New Product</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="form-style">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Short Description</label>
          <textarea
            className="form-control"
            name="short_desc"
            value={product.short_desc}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Long Description</label>
          <textarea
            className="form-control"
            name="long_desc"
            value={product.long_desc}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Count</label>
          <input
            type="number"
            className="form-control"
            name="count"
            value={product.count}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Upload images (5 images)</label>
          <input
            type="file"
            className="form-control-file"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={handleBack}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
