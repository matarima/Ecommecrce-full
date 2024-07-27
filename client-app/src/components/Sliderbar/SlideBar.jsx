import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import "./SlideBar.css";


function SliderBar({ setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <div className="sidebar">
      <h4>Categories</h4>
      <ul className="list-unstyled">
        {categories.map((category) => (
          <li key={category.name}>
            <div
              className="category"
            >
              {category.name}
            </div>
            {category.children && category.children.length > 0 && (
              <ul className="list-unstyled ml-3">
                {category.children.map((child) => (
                  <li key={child.name}>
                    <div
                      className="subcategory"
                      onClick={() => handleCategoryClick(child.name)}
                    >
                      {(child.name).charAt(0).toUpperCase() + (child.name).slice(1)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SliderBar;
