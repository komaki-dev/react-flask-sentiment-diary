from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from flask import request, jsonify, Blueprint
from models import db, Message

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