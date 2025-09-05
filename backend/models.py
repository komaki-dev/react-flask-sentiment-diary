from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, UTC

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120),unique=True,nullable=False)
    password_hash = db.Column(db.String(120),nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC) )


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    label = db.Column(db.String(10))
    score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC) )