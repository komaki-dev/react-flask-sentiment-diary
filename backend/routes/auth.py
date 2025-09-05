from flask import request,jsonify,Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

# ToDo:ログイン機能（現在コメントアウト中）
@auth_bp.route("/login", methods=["POST"])
def post_auth():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == "testuser" and password == "testman123":
        token = create_access_token(identity=username)
        return jsonify(access_token=token),200
    return jsonify({"message":"ログイン失敗"}), 401

@auth_bp.route("/check", methods=["GET"])
@jwt_required()
def token_check():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200