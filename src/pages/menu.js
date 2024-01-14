//menu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../menu.scss';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Menu = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    { name: 'History', description: 'Explore the past...' },
    { name: 'Science', description: 'Discover the world of science...' },
    { name: 'Tech', description: 'Dive into the latest technology...' },
    { name: 'Philosophy', description: 'Delve into deep thoughts and ideas...' }
  ];

  useEffect(() => {
    console.log('API URL:', apiUrl);
    axios.get(`${apiUrl}/books`)
      .then(response => {
        setBooks(response.data);
        setFilteredBooks(response.data); // Initialize with all books
      })
      .catch(error => console.error("Error fetching books: ", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleCategoryClick = (categoryName) => {
    if (categoryName) {
      navigate(`/category/${categoryName}`); // Navigate to category page
    } else {
      setFilteredBooks(books); // Reset to show all books
    }
  };

  return (
    <div className="menu-container">
      <h1>Book Categories</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for books..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="category-buttons">
        <button onClick={() => handleCategoryClick(null)}>All</button>
        {categories.map(category => (
          <button 
            key={category.name}
            className="category-item"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            {/* Additional book details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
