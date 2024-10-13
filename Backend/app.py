# Imports
from flask_cors import CORS
from pymongo import MongoClient
import google.generativeai as genai
from datetime import datetime, timedelta
from flask import Flask, jsonify, request

# Variables
MONGO_URL = ""
GEMINI_API_KEY = ""

# Initialize the MongoDB
client = MongoClient(MONGO_URL)
db = client["Database"]

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Initialize Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Centralized function to check the Authorization token
def check_auth_token():
    token = request.headers.get('Authorization')
    if token is None:
        return jsonify({'error': 'Authorization token is missing'}), 401
    query = {"userID": token}
    account = db["UserData"].find_one(query)
    if not account:
        return jsonify({'error': 'Token is invalid'}), 403
    return None

# Fetch journal entries of a user 
@app.route('/api/journal/fetchEntries', methods=['GET'])
def fetch_entries():
    check_auth_token()
    messages = []
    for msg in list(db["Journals"].find({"userID": request.headers.get('Authorization')})):
        messages.append(
            {
                "text": msg['text'],
                "image": msg['image'],
                "location": msg['location'],
                "date": msg['date']
            }
        )
    return jsonify(messages)

# Add a journal entry for a user 
@app.route('/api/journal/addEntry', methods=['POST'])
def add_entry():
    check_auth_token()
    data = request.get_json()
    db["Journals"].insert_one({
        "userID": request.headers.get('Authorization'),
        "text": data['text'],
        "image": data['image'],
        "location": data['location'],
        "date": datetime.now().strftime("%m/%d/%Y %H:%M:%S")
    })
    return jsonify({'success': True})

# Fetch all forum messages 
@app.route('/api/forum/getMessages', methods=['GET'])
def get_messages():
    check_auth_token()
    msgs = db["ForumPosts"]
    forum_messages = []
    for msg in list(db["ForumPosts"].find({})):
        forum_messages.append(
            {
                "username": msg['username'],
                "likes": msg['likes'],
                "postDate": msg['postDate'],
                "replies": msg['replies'],
                "content": msg['content'],
                "pid": msg['pid'],
            }
        )
    return jsonify(forum_messages)

# Create a reply to a forum message
@app.route('/api/forum/createReply', methods=['POST'])
def create_reply():
    check_auth_token()
    data = request.get_json()
    pid = data.get('pid', 0)
    original_post = db["ForumPosts"].find_one({"pid": pid})
    if original_post:
        new_reply = {
            "content": data.get('content', 'Message'),
            "postDate": datetime.now(),
            "username": data.get('username', 'Guest'),
        }
        db["ForumPosts"].update_one(
            {"_id": original_post["_id"]},
            {"$push": {"replies": new_reply}}
        )
        return get_messages()
    else:
        return jsonify({'error': 'Post ID is invalid'}), 404

# Create a forum post
@app.route('/api/forum/createPost', methods=['POST'])
def create_post():
    check_auth_token()
    data = request.get_json()
    max_post = db["ForumPosts"].find_one(sort=[("pid", -1)])
    if max_post and "pid" in max_post:
        new_pid = max_post["pid"] + 1
    else:
        new_pid = 1
    new_post = {
        "content": data.get('content', 'This is a new post'),
        "likes": 0,
        "replies": [],
        "postDate": datetime.now(),
        "username": data.get('username', 'Guest'),
        "pid": new_pid
    }
    db["ForumPosts"].insert_one(new_post)
    return get_messages()

# Prompt the AI chatbot
@app.route('/api/chatbot/getReply', methods=['POST'])
def get_reply():
    
    # Get reqeust data
    check_auth_token()
    data = request.get_json()
    profile = db["ChatMessages"].find_one({"userID": request.headers.get('Authorization')})
    history = profile['messages']
    message = data.get("message", "(No Message Provided)")
    profile = db["UserData"].find_one({"userID": request.headers.get('Authorization')})["profile"]
    
    # Create prompt
    model = genai.GenerativeModel("gemini-1.5-flash")
    history.append(message)
    previous_messages = "; ".join(history)
    questions = "; ".join(profile)
    prompt_message = f"You are a compassionate and supportive therapist engaging in a conversation via text. Your goal is to respond with understanding, care, and thoughtful guidance, helping the user feel heard, validated, and respected. Keep your responses concise, warm, and natural, similar to a real-life text-based therapy session. Avoid over-explaining or being too formal. Consider the user's questionnaire answers and previous messages carefully, and respond with empathy, offering gentle guidance or questions that encourage self-reflection when appropriate.\n\nQuestionnaire Results: {questions}\nPrevious Conversation: {previous_messages}\nRespond with kindness, empathy, and constructive insight, while keeping the tone supportive and approachable."

    # Generate response & update databases
    response = model.generate_content(prompt_message)
    db["ChatMessages"].update_one(
        {"userID": request.headers.get('Authorization')},
        {"$push": {"messages": message}}
    )
    db["ChatMessages"].update_one(
        {"userID": request.headers.get('Authorization')},
        {"$push": {"messages": response.text.strip()}}
    )
    return response.text

# Add a daily checkin response 
@app.route('/api/check/addResponse', methods=['POST'])
def add_response():
    
    # Checking request/user data
    check_auth_token()
    current_date = datetime.now().strftime("%d-%m-%y")
    data = request.get_json()
    if not data or 'rating' not in data:
        return jsonify({'error': 'Missing rating in request'}), 400
    user_document = db["UserData"].find_one({"userID": request.headers.get('Authorization')})

    # Add checkin to Mongo
    if user_document
        checkins = user_document.get("checkins", {})
        for time_str in list(checkins.keys()):
            if time_str.startswith(current_date):
                db["UserData"].update_one(
                    {"userID": request.headers.get('Authorization')},
                    {"$unset": {f"checkins.{time_str}": ""}}
                )

    # Add the new check-in for the current date with the current time
    current_timestamp = datetime.now().strftime("%d-%m-%y %H:%M")
    db["UserData"].update_one(
        {"userID": request.headers.get('Authorization')},
        {"$set": {f"checkins.{current_timestamp}": data.get("rating")}},
        upsert=True
    )
    return jsonify({'success': True})

# Fetch previous check in responses 
@app.route('/api/check/fetchResponses', methods=['GET'])
def fetch_responses():
    
    # Checking user data
    check_auth_token()
    user_document = db['UserData'].find_one({"userID": request.headers.get('Authorization')})
    if user_document and "checkins" in user_document:
        checkins = []
        checkin_dates = {}

        # Sort through existing cheeck ins 
        for time_str, rating in user_document["checkins"].items():
            try:
                checkin_date = datetime.strptime(time_str, "%d-%m-%y %H:%M").date()
            except ValueError:
                print(f"Invalid timestamp format: {time_str}")
                continue 
            if isinstance(rating, (int, float)):
                rating_value = rating
            elif isinstance(rating, dict):
                rating_value = list(rating.values())[0]
            else:
                print(f"Unexpected rating format for {time_str}: {rating}")
                continue 
            checkin_dates[checkin_date] = rating_value

        # Iterate over the last 30 days
        today = datetime.today().date()
        for i in range(30):
            current_day = today - timedelta(days=i)
            rating_value = checkin_dates.get(current_day, 0)
            checkins.append({
                "timestamp": current_day.isoformat(),
                "rating": rating_value
            })

        return jsonify(checkins)

    return jsonify([])


# Run the app if this file is executed directly
if __name__ == '__main__':
    app.run(debug=True, port=5000)
