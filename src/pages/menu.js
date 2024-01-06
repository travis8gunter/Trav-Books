import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../menu.scss';



const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]); // All books
  const [filteredBooks, setFilteredBooks] = useState([]); // filtered/search result books
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories: ", error);
      });

    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
        setFilteredBooks(response.data); //all books shown
      })
      .catch(error => {
        console.error("Error fetching books: ", error);
      });
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

  return (
    <div className="menu-container">
      <h1>Book Categories</h1>
      <div className="categories">
        {categories.map(category => (
          <button 
            key={category.name}
            className="category-item"
            onClick={() => {/* click functionality */}}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for books..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            {/* Display book details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;