from flask import Flask, request, jsonify
from flask_cors import CORS
from extensions import db
from models import Book

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

# API routes

@app.route('/')
def index():
    return "Welcome to Trav's Library!"

@app.route('/add_book', methods=['POST'])
def add_book():
    data = request.json
    new_book = Book(title=data['title'], author=data['author'], rating=data['rating'], category=data['category'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'message': 'Book added successfully!'}), 201

@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    books_data = [{'title': book.title, 'author': book.author, 'rating': book.rating, 'category': book.category} for book in books]
    return jsonify(books_data)

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = ['History', 'Science', 'Tech', 'Philosophy']  # Update if need more categories
    return jsonify([{'name': category} for category in categories])

@app.route('/books/category/<category_name>', methods=['GET'])
def get_books_by_category(category_name):
    books = Book.query.filter_by(category=category_name).all()
    books_data = [{'id': book.id, 'title': book.title, 'author': book.author, 'rating': book.rating} for book in books]
    return jsonify(books_data)


if __name__ == '__main__':
    app.run(debug=True)
