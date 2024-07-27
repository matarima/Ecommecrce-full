import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "../../store/popupSlice";
import "./Popup.css";

function Popup() {
  const dispatch = useDispatch();
  const { visible, product } = useSelector((state) => state.popup);

  if (!visible || !product) return null;

  return (
    <div className="popup-overlay" onClick={() => dispatch(hidePopup())}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => dispatch(hidePopup())}>
          &times;
        </button>
        <div className="popup-body">
          <img src={product.img1} alt={product.name} className="popup-image" />
          <div className="popup-details">
            <h3>{product.name}</h3>
            <p>
              {Number(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p>{product.short_desc}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() =>
                (window.location.href = `/detail/${product._id}`)
              }
            >
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
