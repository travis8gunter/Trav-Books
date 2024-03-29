import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CategoryPage.scss'; 

const CategoryPage = () => {
  const [books, setBooks] = useState([]);
  const { category } = useParams();

  // In CategoryPage.js
useEffect(() => {
  axios.get(`${apiUrl}/books/category/$category}`)
    .then(response => {
      setBooks(response.data);
    })
    .catch(error => console.error('Error fetching data:', error));
}, [category]);


  return (
    <div className="category-container">
      <h1>{category}</h1>
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.imageUrl || '/path-to-default-placeholder-image.jpg'} alt={book.title} />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {/* Add more book details here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
