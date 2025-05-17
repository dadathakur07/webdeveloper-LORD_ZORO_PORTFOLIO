from nltk.chat.util import Chat, reflections
from flask_cors import CORS
CORS(app)
import logging
logging.basicConfig(level=logging.INFO)
from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)

# AI Chatbot API
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '').lower()
    
    # Simple AI responses
    if 'hello' in message or 'hi' in message:
        response = "Greetings! I'm Lord Zoro's AI assistant. How can I help you?"
    elif 'project' in message:
        response = "I've worked on various projects including cyber security dashboards and AI applications."
    elif 'contact' in message:
        response = "You can reach me at contact@lordzoro.dev or through the contact form."
    elif 'skill' in message:
        response = "My skills include Python, JavaScript, React, and UI/UX design."
    else:
        response = "I'm sorry, I didn't understand that. Could you rephrase?"
    
    # Simulate processing time
    time.sleep(1)
    
    return jsonify({
        "response": response,
        "timestamp": int(time.time())
    })

# Biometric Authentication API
@app.route('/api/authenticate', methods=['POST'])
def authenticate():
    # In a real app, you would verify biometric data here
    return jsonify({
        "status": "success",
        "message": "Biometric authentication successful",
        "access_granted": True
    })

# Voice Command Processing
@app.route('/api/voice-command', methods=['POST'])
def voice_command():
    data = request.json
    transcript = data.get('transcript', '').lower()
    
    response = {
        "action": None,
        "message": "Command not recognized"
    }
    
    if 'project' in transcript:
        response = {
            "action": "navigate",
            "target": "projects",
            "message": "Navigating to projects section"
        }
    elif 'contact' in transcript:
        response = {
            "action": "navigate",
            "target": "contact",
            "message": "Navigating to contact section"
        }
    elif 'skill' in transcript:
        response = {
            "action": "navigate",
            "target": "skills",
            "message": "Navigating to skills section"
        }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)