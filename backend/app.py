from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from .extensions import db

from models import Book

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # Initialize the database with the Flask app
CORS(app)  # Enable Cross-Origin Resource Sharing

# API route to display a welcome message
@app.route('/')
def index():
    return "Welcome to Trav's Library!"

# API route to add a new book
@app.route('/add_book', methods=['POST'])
def add_book():
    data = request.json
    # Validate that all required fields are in the request
    if not data or 'title' not in data or 'author' not in data or 'rating' not in data or 'category' not in data:
        abort(400, description="Missing book data")
    # Validate data types
    if not isinstance(data['title'], str) or not isinstance(data['author'], str):
        abort(400, description="Invalid data type for title or author")
    # Create a new book and add it to the database
    new_book = Book(title=data['title'], author=data['author'], rating=data['rating'], category=data['category'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'message': 'Book added successfully!'}), 201

# API route to get all books
@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()  # Retrieve all books from the database
    books_data = [{'title': book.title, 'author': book.author, 'rating': book.rating, 'category': book.category} for book in books]
    return jsonify(books_data)

# API route to get categories
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = ['History', 'Science', 'Tech', 'Philosophy']
    return jsonify([{'name': category} for category in categories])

# API route to get books by a specific category
@app.route('/books/category/<category_name>', methods=['GET'])
def get_books_by_category(category_name):
    books = Book.query.filter_by(category=category_name).all()
    books_data = [{'id': book.id, 'title': book.title, 'author': book.author, 'rating': book.rating} for book in books]
    return jsonify(books_data)

# API route to update a book's details
@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.json
    book = Book.query.get(book_id)  # Retrieve the book to update
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    # Update the book's details
    book.title = data.get('title', book.title)
    book.author = data.get('author', book.author)
    book.rating = data.get('rating', book.rating)
    book.category = data.get('category', book.category)
    db.session.commit()
    return jsonify({'id': book.id, 'title': book.title, 'author': book.author, 'rating': book.rating, 'category': book.category})

# API route to delete a book
@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)  # Retrieve the book to delete
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    db.session.delete(book)  # Delete the book from the database
    db.session.commit()
    return jsonify({'message': 'Book deleted'})

# Error handler for bad requests
@app.errorhandler(400)
def bad_request(error):
    return jsonify(error=str(error)), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)