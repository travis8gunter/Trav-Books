import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../home.scss';

const Home = () => {
  const categories = [
    { name: 'History', description: 'Explore the past...' },
    { name: 'Science', description: 'Discover the world of science...' },
    { name: 'Tech', description: 'Dive into the latest technology...' },
    { name: 'Philosophy', description: 'Delve into deep thoughts and ideas...' }
  ];



  return (
    <div className="home-container">
      <div className="header-image">
        <h1>Welcome to Trav's Library</h1>
      </div>
      <div className="categories-container">
  {categories.map(category => (
    <div key={category.name} className="category-box">
      <Link to={`/category/${category.name}`}>{category.name}</Link>
      <p className="category-description">{category.description}</p>
    </div>
  ))}
</div>
      <div className="additional-info">
        <p>
          Explore our extensive collection of books across multiple genres. From historical insights to 
          scientific discoveries, from the latest tech trends to philosophical theories, our library has 
          something for everyone. Dive into the world of reading with Trav's Library!
        </p>
      </div>
    </div>
  );
};

export default Home;
