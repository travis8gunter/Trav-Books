// src/components/CategoryButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../category-buttons.scss';

const CategoryButtons = () => {
  const navigate = useNavigate();
  const categories = ['History', 'Science', 'Tech', 'Philosophy'];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="category-buttons">
      {categories.map(category => (
        <button 
          key={category}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
