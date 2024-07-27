import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";

import { useNavigate } from "react-router-dom";
import "./CategoryList.css"; // File CSS cho các style

function CategoryList() {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/shop");
  };

  const [categories, setCategories] = useState([]);
  
  const images = [
    {
      "iphone": require("../../assets/product_1.png"),
      "macbook": require("../../assets/product_2.png"),
      "ipad" : require("../../assets/product_3.png"),
      "watch": require("../../assets/product_4.png"),
      "airpod": require("../../assets/product_5.png"),
    }
  ];

  useEffect(() => {
    axios
      .get("/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="category-list container">
      <h3 className="text-center mb-4">CAREFULLY CREATED COLLECTIONS</h3>
      <h2 className="text-center mb-4">BROWSE OUR CATEGORIES</h2>
      <div className="row">
        {categories.map((category) => (
          <div
            className="col-md-4 mb-4"
            key={category}
            onClick={handleCategoryClick}
          >
            <div className="category-item">
              <img src={images[0][category]} alt={category} className="img-fluid" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
