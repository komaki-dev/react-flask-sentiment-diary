from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from models import db
from routes import register_routes
import os


load_dotenv()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

CORS( app,supports_credentials=True, origins="http://localhost:5173")

db.init_app(app)
JWT = JWTManager(app)

register_routes(app)


if __name__ == "__main__":
    app.run(debug=True)