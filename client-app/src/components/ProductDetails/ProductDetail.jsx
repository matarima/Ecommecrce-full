import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import UserContext from "../../utils/UserContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { user } = useContext(UserContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatDescription = (description) => {
    return description.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleAddToCart = () => {
    if (user) {
      if (product.count < quantity) {
        alert("Số lượng sản phẩm không đủ!");
        return;
      }
      const item = {
        ...product,
        quantity,
        id: product._id,
      };
      dispatch(addToCart({ userId: user._id, item }));
    } else {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        const { product, relatedProducts } = response.data;
        setProduct(product);
        setRelatedProducts(relatedProducts);
      } catch (error) {
        console.error("Error fetching the product data", error);
      }
    };

    fetchProducts();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={`https://backend-ecommecre.onrender.com${product.img1}`} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{formatPrice(product.price)} VND</p>
          <p>{formatDescription(product.short_desc)}</p>
          <div>
            <label>Category: </label>
            <span> {product.category}</span>
          </div>
          <div className="quantity-control">
            <label>Quantity: </label>
            <input
              type="number"
              min="1"
              max={product.count}
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="form-control"
            />
          </div>
          <p>Stock: {product.count > 0 ? `In stock: ${product.count}` : 'Out of stock'}</p>
          <button
            onClick={handleAddToCart}
            className="mt-3 btn btn-dark"
            disabled={product.count === 0}
          >
            {product.count === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="description mt-5">
        <h3>Product Description</h3>
        <p>{formatDescription(product.long_desc)}</p>
      </div>
      <div className="related-products mt-5">
        <h3>Related Products</h3>
        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="col-md-3">
              <div
                className="related-product-item"
                onClick={() => handleProductClick(relatedProduct._id)}
              >
                <img
                  src={`https://backend-ecommecre.onrender.com${relatedProduct.img1}`}
                  alt={relatedProduct.name}
                  className="img-fluid"
                />
                <p>{relatedProduct.name}</p>
                <p>{formatPrice(relatedProduct.price)} VND</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
