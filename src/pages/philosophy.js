import React, { useEffect, useState } from 'react';
import axios from 'axios';
import philosophyImage from '../images/phil-header.png'; 

const Philosophy = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books/category/Philosophy')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error("Error fetching books: ", error));
  }, []);

  return (
    <div>
      <img src={philosophyImage} alt="Philosophy" className="category-header-image" />
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            {/* Display book details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Philosophy;
