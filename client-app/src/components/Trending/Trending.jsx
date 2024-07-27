import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showPopup } from "../../store/popupSlice";
import axios from "../../utils/axiosConfig";
import "./Trending.css"; // File CSS cho các style

function Trending() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/trending")
      .then((response) => {
        const data = response.data.slice(0, 8); // Lấy tối đa 8 phần tử đầu tiên
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleImageClick = (product) => {
    dispatch(showPopup(product));
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="product-list container">
      <h3 className="text-center mb-4">MADE THE HARD WAY</h3>
      <h2 className="text-center mb-4">TOP TRENDING PRODUCTS</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="product-item">
              <img
                src={product.img1}
                alt={product.name}
                className="img-fluid"
                onClick={() => handleImageClick(product)}
              />
              <h5 className="mt-3">{product.name}</h5>
              <p className="price">{formatPrice(product.price)} VND</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
