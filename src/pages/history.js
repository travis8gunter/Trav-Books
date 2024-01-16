import React, { useEffect, useState } from 'react';
import axios from 'axios';
import historyImage from '../images/history-lib.png'; 
import CategoryButtons from './categorybutton';
const apiUrl = process.env.REACT_APP_API_URL || 'https://trav-books-d81f55bff5ac.herokuapp.com/';

const History = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/category/History`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error("Error fetching books: ", error));
  }, []);

  return (
    <div>
      <img src={historyImage} alt="History" className="category-header-image" />
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

export default History;
