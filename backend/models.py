from extensions import db

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Book {self.title}, Author: {self.author}, Rating: {self.rating}>"
