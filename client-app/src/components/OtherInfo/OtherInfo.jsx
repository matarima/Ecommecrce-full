import React from 'react';
import './OtherInfo.css';

function OtherInfo() {
  return (
    <div className="other-info container mt-5">
      <div className="row text-center py-4">
        <div className="col-md-4">
          <h5>FREE SHIPPING</h5>
          <p>Free shipping worldwide</p>
        </div>
        <div className="col-md-4">
          <h5>24 X 7 SERVICE</h5>
          <p>Free shipping worldwide</p>
        </div>
        <div className="col-md-4">
          <h5>FESTIVAL OFFER</h5>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className="subscribe-box text-center py-4">
        <h5>LET'S BE FRIENDS!</h5>
        <p>Nisi nisi tempor consequat laboris nisi.</p>
        <form className="d-flex justify-content-center mt-3">
          <input type="email" className="form-control" placeholder="Enter your email address" />
          <button type="submit" className="btn btn-dark ml-2">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default OtherInfo;
