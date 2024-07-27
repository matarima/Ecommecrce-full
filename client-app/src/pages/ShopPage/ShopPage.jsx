import React, { useState } from 'react';
import SliderBar from '../../components/Sliderbar/SlideBar';
import ProductList from '../../components/ProductList/ProductList';
import './ShopPage.css';

function ShopPage() {
  const [category, setCategory] = useState('All');

  return (
    <div className="shop-page container mt-5">
      <div className="row">
        <div className="col-md-3">
          <SliderBar setCategory={setCategory} />
        </div>
        <div className="col-md-9">
          <ProductList category={category} />
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
