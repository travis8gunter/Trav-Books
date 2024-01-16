import React, { useEffect, useState } from 'react';
import axios from 'axios';
import scienceImage from '../images/si-fi.png';
import '../cate-page.scss';
import CategoryButtons from './categorybutton';

const Science = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/books/category/Science`)

      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error("Error fetching books: ", error));
  }, []);

  return (
    <div>
      <img src={scienceImage} alt="Science" className="category-header-image" />
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

export default Science;
