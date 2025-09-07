from app import app
from models import db, User
from werkzeug.security import generate_password_hash
from datetime import datetime, UTC

with app.app_context():
    db.create_all()

    if not User.query.filter_by(username="demo").first():
        u = User(
            username = "demo",
            email = "demo@example.com",
            password_hash = generate_password_hash("demo-pass"),
            created_at = datetime.now(UTC),
        )
        db.session.add(u)
        db.session.commit()
        print("Seeded demo user:", u.id)