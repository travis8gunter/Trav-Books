import React, { useEffect, useState } from 'react';
import axios from 'axios';
import philosophyImage from '../images/phil-header.png'; 
import CategoryButtons from './categorybutton';

const Philosophy = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/books/category/Philosophy`)

      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error("Error fetching books: ", error));
  }, []);

  return (
    <div>
      <img src={philosophyImage} alt="Philosophy" className="category-header-image" />
      <CategoryButtons />
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
