import json
import os 
from flask import Flask,render_template,request,jsonify
from openai import OpenAI
from config import API_KEY 

app = Flask(__name__)

client = OpenAI(
    api_key=API_KEY,
base_url="https://openrouter.ai/api/v1"
)


@app.route("/")
def home_page():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_message = request.json["message"]

        response = client.chat.completions.create(
            model="openrouter/free",
            messages=[
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        bot_reply=response.choices[0].message.content
        history = []
        if os.path.exists("chat_history.json"):
            with open("chat_history.json", "r") as file:
                history = json.load(file)
        history.append({
            "user": user_message,
            "bot": bot_reply
        })
        with open("chat_history.json", "w") as file:
            json.dump(history, file, indent=4)

        return jsonify({
            "reply": bot_reply
        })

    except Exception as e:
        print(e)
        return jsonify({
            "reply": str(e)
        })
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)