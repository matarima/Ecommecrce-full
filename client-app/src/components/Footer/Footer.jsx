import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Customer Services</h5>
            <ul className="list-unstyled">
              <li><a href="/#" className="text-white">Help & Contact Us</a></li>
              <li><a href="/#" className="text-white">Returns & Refunds</a></li>
              <li><a href="/#" className="text-white">Online Stores</a></li>
              <li><a href="/#" className="text-white">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="/#" className="text-white">What We Do</a></li>
              <li><a href="/#" className="text-white">Available Services</a></li>
              <li><a href="/#" className="text-white">Latest Posts</a></li>
              <li><a href="/#" className="text-white">FAQs</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li><a href="/#" className="text-white">Twitter</a></li>
              <li><a href="/#" className="text-white">Instagram</a></li>
              <li><a href="/#" className="text-white">Facebook</a></li>
              <li><a href="/#" className="text-white">Pinterest</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
