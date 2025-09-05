from .auth import auth_bp
from .message import message_bp

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(message_bp)