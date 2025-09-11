from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from flask import request, jsonify, Blueprint
from models import db, Message, User

message_bp = Blueprint("message", __name__)

#日本語モデル
model_name = "jarvisx17/japanese-sentiment-analysis"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

@message_bp.route("/message", methods=["POST", "OPTIONS"])
def post_message():
    if request.method == "OPTIONS":
        return "", 200 #プリフライト用のokレスポンス
    data = request.get_json()
    print("受け取ったメッセージ：", data["message"])
    message = data.get("message","")

    sentences = [s.strip() for s in message.split("。") if s.strip()]

    results =[]
    pos_total,neg_total = 0,0

    for s in sentences:
        r = classifier(s)[0]
        results.append({"message": s, "label": r["label"], "score": r["score"]})
        if r["label"] == "positive":
            pos_total += r["score"]

        else:
            neg_total += r["score"]


    summary = "positive" if pos_total >= neg_total else "negative"
    print(summary)
    return jsonify({"summary":summary, "detail": results})

@message_bp.route("/add", methods=["POST"])
def add_message():
    data = request.get_json()

    demo_user = User.query.filter_by(username="demo").first()

    m = Message(
        user_id=demo_user.id,
        message=data["message"],
        label=data.get("label"),
        score=data.get("score"),
    )
    db.session.add(m)
    db.session.commit()
    return jsonify({"status": "saved", "id": m.id}),201

@message_bp.route("/read", methods=["GET"])
def get_messages():
    messages = Message.query.order_by(Message.created_at.desc()).all() #新しい順にする
    message_list = [
        {
            "id": m.id,
            "user_id": m.user_id,
            "message": m.message,
            "label": m.label,
            "score": m.score,
            "created_at": (
                m.created_at.isoformat(sep=" ", timespec="seconds") #datetime を JSON に変換
                if hasattr(m.created_at, "isoformat") else str(m.created_at)
            ),
        }
        for m in messages
    ]
    return jsonify(message_list), 200