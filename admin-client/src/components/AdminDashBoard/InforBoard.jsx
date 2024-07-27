import React from "react";
import "./InfoBoard.css";

const InfoBoard = ({ clients, earnings, newOrders }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h3 className="card-title">{clients}</h3>
            <p className="card-text">Clients</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h3 className="card-title">{(earnings).toLocaleString()} VND</h3>
            <p className="card-text">Earnings of Month</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h3 className="card-title">{newOrders}</h3>
            <p className="card-text">New Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBoard;
