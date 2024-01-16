#app.py
import os
from flask import Flask, request, jsonify, abort, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask extensions
db = SQLAlchemy()

# Define models
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Book {self.title}, Author: {self.author}, Rating: {self.rating}>"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Create Flask app
def create_app():
    app = Flask(__name__, static_folder='../build')

    # Database configuration
    uri = os.getenv('DATABASE_URL', 'sqlite:///local.db')
    if uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = uri

    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app, resources={r"/*": {"origins": "https://trav-books-d81f55bff5ac.herokuapp.com/"}})

    # Create tables if they don't exist
    @app.before_first_request
    def create_tables():
        db.create_all()

    # Define routes
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    @app.route('/add_book', methods=['POST'])
    def add_book():
        data = request.get_json()
        new_book = Book(title=data['title'], author=data['author'], 
                        rating=data['rating'], category=data['category'])
        db.session.add(new_book)
        db.session.commit()
        return jsonify({'message': 'Book added successfully!'}), 201

    @app.route('/books', methods=['GET'])
    def get_books():
        books = Book.query.all()
        return jsonify([{'title': book.title, 'author': book.author, 
                         'rating': book.rating, 'category': book.category} 
                        for book in books]), 200

    @app.route('/books/<int:book_id>', methods=['PUT'])
    def update_book(book_id):
        data = request.get_json()
        book = Book.query.get_or_404(book_id)
        book.title = data.get('title', book.title)
        book.author = data.get('author', book.author)
        book.rating = data.get('rating', book.rating)
        book.category = data.get('category', book.category)
        db.session.commit()
        return jsonify({'message': 'Book updated successfully'}), 200


    @app.route('/books/<int:book_id>', methods=['DELETE'])
    def delete_book(book_id):
        book = Book.query.get_or_404(book_id)
        db.session.delete(book)
        db.session.commit()
        return jsonify({'message': 'Book deleted successfully'}), 200

    @app.route('/categories', methods=['GET'])
    def get_categories():
        categories = {book.category for book in Book.query.all()}
        return jsonify(list(categories)), 200

    return app

# Instantiate and run the Flask application
app = create_app()
if __name__ == '__main__':
    app.run(debug=True)
