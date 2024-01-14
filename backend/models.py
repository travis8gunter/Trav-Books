#models.py
from backend.extensions import db


from werkzeug.security import generate_password_hash, check_password_hash

# Model for the Book
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Book {self.title}, Author: {self.author}, Rating: {self.rating}>"

# Model for the User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        # Create a hashed password
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        # Check the hashed password
        return check_password_hash(self.password_hash, password)
