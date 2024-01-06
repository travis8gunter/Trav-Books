import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../main.scss'; // 
import aboutImage from '../images/books-feather.jpeg'; 

const About = () => {
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/category_counts') // URL of API endpoint
      .then(response => {
        setCategoryCounts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="about-container">
      <div className="about-image">
        <img src={aboutImage} alt="About Us" />
      </div>
      <div className="about-text">
        <h2>About Us</h2>
        <p>
        Ever since I can remember, my world has revolved around the pages of books, where each turn brought me closer to new worlds of knowledge and imagination. Reading has always been more than just a hobby for me; it's a journey through the realms of wisdom and discovery. Over the years, I've had the pleasure of delving into countless books, each offering its unique perspective and valuable insights. Among these, some have stood out as favorites, leaving a lasting impact on my life and thinking. These cherished volumes have not only shaped my understanding but have also been a constant source of inspiration and guidance. Through 'Trav's Library,' I am excited to share these treasured reads with you. My hope is that these books will enlighten, inspire, and offer you the same joy and wisdom they have brought to me.
        </p>
      </div>
      <div className='number-read'>
          <ul>
            {categoryCounts.map(category => (
              <li key={category.name}>
                {category.name}: {category.count} books
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default About;

