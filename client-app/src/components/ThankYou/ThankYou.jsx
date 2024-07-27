import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";

const ThankYou = () => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      dispatch(clearCart(user._id)); // Clear the cart after fetching the user's cart
    }
  }, [dispatch, user]);

  return (
    <div className="container mt-5 text-center">
      <h1>Thank You!</h1>
      <p>Your order has been placed successfully.</p>
      <Link to="/shop" className="btn btn-dark">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
