import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../crud-component.scss'; // Importing the SCSS file for styling
const apiUrl = process.env.REACT_APP_API_URL || '//trav-books-d81f55bff5ac.herokuapp.com';

const CrudComponent = () => {
    // State for storing books list and form data
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({ title: '', author: '', rating: '', category: '' });

    // Fetch books when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    // Function to fetch books from the backend
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${apiUrl}/books`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Handles input changes for the form fields
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handles the form submission for both adding and updating books
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                // Update book if formData has an id
                await axios.put(`${apiUrl}/${formData.id}`, formData);
            } else {
                // Add a new book if formData doesn't have an id
                await axios.post(`${apiUrl}/add_book`, formData);
            }
            fetchBooks(); // Refresh the books list
            setFormData({ title: '', author: '', rating: '', category: '' }); // Reset form fields
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Populates the form with data for editing
    const handleEdit = (book) => {
        setFormData(book);
    };

    // Handles the deletion of a book
    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`${apiUrl}/books/${bookId}`);
            fetchBooks(); // Refresh the books list
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // JSX for CRUD component
    return (
        <div className="crud-container">
            <h2 className="crud-header">Book Admin Controls</h2>
            <div className="crud-form">
                <form onSubmit={handleSubmit}>
                    {/* Form fields for input */}
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
                    <input type="text" name="author" value={formData.author} onChange={handleInputChange} placeholder="Author" required />
                    <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} placeholder="Rating" />
                    <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="crud-list">
                <h3>Books List</h3>
                {books.map(book => (
                    <div key={book.id} className="crud-item">
                        {/* Displaying book information */}
                        <div className="item-info">
                            <span className="item-title">{book.title}</span> by {book.author}
                        </div>
                        {/* Edit and Delete buttons for each book */}
                        <div className="item-actions">
                            <button onClick={() => handleEdit(book)}>Edit</button>
                            <button onClick={() => handleDelete(book.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CrudComponent;
