import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, updateCart, deleteCart } from "../../store/cartSlice";
import "./CartPage.css";
import UserContext from "../../utils/UserContext";

const Cart = () => {
  const cart = useSelector((state) => state.cart.listCart);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      // Cập nhật state quantities ngay lập tức
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: quantity,
      }));
      dispatch(updateCart({ userId: user._id, productId, quantity }));
    }
  };
  const handleRemove = (productId) => {
    if (user) {
      dispatch(deleteCart({ userId: user._id, productId }));
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Cập nhật state quantities khi cart thay đổi (do fetchCart thành công)
    const initialQuantities = {};
    for (const item of cart) {
      initialQuantities[item._id] = item.quantity;
    }
    setQuantities(initialQuantities);
  }, [cart]); 

  const total = cart.reduce((acc, item) => {
    const quantity = quantities[item._id] ?? item.quantity;
    return acc + item.price * quantity;
  }, 0);

  if (!user) {
    return <div>Vui lòng đăng nhập để xem giỏ hàng</div>;
  }

  if (!cart || cart.length === 0) {
    return <div>Giỏ hàng trống</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CART</h1>
      <div className="row">
        <div className="col-md-8">
          <h2>SHOPPING CART</h2>
          <table className="table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.img1}
                      alt={item.name}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)} VND</td>
                  <td>
                    <div className="quantity-control">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            quantities[item._id] - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantities[item._id] ?? item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item._id, +e.target.value)
                        }
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            quantities[item._id] + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    {formatPrice(
                      item.price * (quantities[item._id] ?? item.quantity)
                    ).toLocaleString()}{" "}
                    VND
                  </td>
                  <td>
                    <button
                      className="btn btn-link"
                      onClick={() => handleRemove(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/shop" className="btn btn-outline-secondary">
            Continue shopping
          </Link>
        </div>
        <div className="col-md-4">
          <h2>CART TOTAL</h2>
          <div className="cart-total">
            <p>
              SUBTOTAL <span>{formatPrice(total)} VND</span>
            </p>
            <p>
              TOTAL <span>{formatPrice(total)} VND</span>
            </p>
            <input
              type="text"
              placeholder="Enter your coupon"
              className="form-control mb-3"
            />
            <button className="btn btn-dark btn-block mb-3">
              Apply coupon
            </button>
            <button className="btn btn-dark btn-block" onClick={handleCheckout}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
