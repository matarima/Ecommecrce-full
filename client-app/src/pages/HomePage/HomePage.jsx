import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import CategoryList from '../../components/CategoryList/CategoryList';
import Trending from '../../components/Trending/Trending';
import OtherInfo from '../../components/OtherInfo/OtherInfo';
import Popup from '../../components/Popup/Popup';

function HomePage() {
  const navigate = useNavigate();

  const handleBrowseCollections = () => {
    navigate('/shop');
  };

  return (
    <div className="home-page">
      <div className="banner" style={{ backgroundImage: `url(${require('../../assets/banner1.jpg')})` }}>
        <div className="banner-content">
          <h5>NEW INSPIRATION 2020</h5>
          <h1>20% OFF ON NEW SEASON</h1>
          <button className="btn btn-dark" onClick={handleBrowseCollections}>Browse collections</button>
        </div>
      </div>
      <CategoryList /> 
      <Trending />
      <OtherInfo />
      <Popup />
    </div>
  );
}

export default HomePage;
