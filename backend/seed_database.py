from app import app
from .extensions import db
from models import Book

def add_books():
    philosophy_books = [
        {"title": "The Art of War", "author": "Sun Tzu", "category": "Philosophy", "rating": 4.6},
        {"title": "Meditations", "author": "Marcus Aurelius", "category": "Philosophy", "rating": 4.6},
        {"title": "Letters from a Stoic", "author": "Seneca", "category": "Philosophy", "rating": 4.6},
        {"title": "Beyond Good and Evil", "author": "Friedrich Nietzsche", "category": "Philosophy", "rating": 4.6},
        {"title": "Critique of Pure Reason", "author": "Immanuel Kant", "category": "Philosophy", "rating": 4.6}
    ]

    history_books = [
        {"title": "A Brief History of Time", "author": "Stephen Hawking", "category": "History", "rating": 4.6},
        {"title": "Sapiens: A Brief History of Humankind", "author": "Yuval Noah Harari", "category": "History", "rating": 4.6},
        {"title": "Guns, Germs, and Steel", "author": "Jared Diamond", "category": "History", "rating": 4.6},
        {"title": "The History of the Ancient World", "author": "Susan Wise Bauer", "category": "History", "rating": 4.6},
        {"title": "The Silk Roads", "author": "Peter Frankopan", "category": "History", "rating": 4.6}
    ]

    science_books = [
        {"title": "The Selfish Gene", "author": "Richard Dawkins", "category": "Science", "rating": 4.6},
        {"title": "Cosmos", "author": "Carl Sagan", "category": "Science", "rating": 4.6},
        {"title": "The Elegant Universe", "author": "Brian Greene", "category": "Science", "rating": 4.6},
        {"title": "A Brief History of Time", "author": "Stephen Hawking", "category": "Science", "rating": 4.6},
        {"title": "Silent Spring", "author": "Rachel Carson", "category": "Science", "rating": 4.6}
    ]

    tech_books = [
        {"title": "The Innovators", "author": "Walter Isaacson", "category": "Tech", "rating": 4.6},
        {"title": "Hooked: How to Build Habit-Forming Products", "author": "Nir Eyal", "category": "Tech", "rating": 4.6},
        {"title": "Steve Jobs", "author": "Walter Isaacson", "category": "Tech", "rating": 4.6},
        {"title": "Clean Code", "author": "Robert C. Martin", "category": "Tech", "rating": 4.6},
        {"title": "The Pragmatic Programmer", "author": "Andrew Hunt and David Thomas", "category": "Tech", "rating": 4.6}
    ]
#combine all books onto 1 list
    all_books = philosophy_books + history_books + science_books + tech_books
#add books to database
    with app.app_context():
        for book in all_books:
            new_book = Book(title=book['title'], author=book['author'], category=book['category'], rating=book['rating'])
            db.session.add(new_book)

        db.session.commit()

if __name__ == "__main__":
    add_books()
