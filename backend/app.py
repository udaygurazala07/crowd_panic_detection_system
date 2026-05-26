import os
import random
import cv2

from flask import Flask, request, jsonify
from flask_cors import CORS

# --------------------------------
# Initialize Flask App
# --------------------------------

app = Flask(__name__)
CORS(app)

# --------------------------------
# Upload Folder
# --------------------------------

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --------------------------------
# Home Route
# --------------------------------

@app.route('/')
def home():
    return "Backend Running Successfully"

# --------------------------------
# Prediction API
# --------------------------------

@app.route('/predict', methods=['POST'])
def predict():

    try:

        data = request.get_json()

        crowd_density = float(data.get("crowd_density", 0))
        movement_speed = float(data.get("movement_speed", 0))
        sound_level = float(data.get("sound_level", 0))
        queue_time = float(data.get("queue_time", 0))
        temperature = float(data.get("temperature", 0))
        heart_rate = float(data.get("heart_rate", 0))

        # --------------------------------
        # Panic Score Calculation
        # --------------------------------

        score = (
            crowd_density * 0.30 +
            movement_speed * 0.20 +
            sound_level * 0.15 +
            queue_time * 0.10 +
            temperature * 0.10 +
            heart_rate * 0.15
        )

        probability = min(int(score), 100)

        if probability >= 70:
            emergency = "YES"
        else:
            emergency = "NO"

        return jsonify({
            "emergency": emergency,
            "panic_probability": probability
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# --------------------------------
# Video Upload API
# --------------------------------

@app.route('/upload-video', methods=['POST'])
def upload_video():

    try:

        if 'video' not in request.files:
            return jsonify({
                "error": "No video uploaded"
            }), 400

        video = request.files['video']

        if video.filename == '':
            return jsonify({
                "error": "Empty filename"
            }), 400

        video_path = os.path.join(
            UPLOAD_FOLDER,
            video.filename
        )

        video.save(video_path)

        cap = cv2.VideoCapture(video_path)

        frame_count = 0

        while True:

            success, frame = cap.read()

            if not success:
                break

            frame_count += 1

        cap.release()

        # Simulated AI Result
        panic_probability = random.randint(65, 98)

        if panic_probability >= 70:
            emergency = "YES"
        else:
            emergency = "NO"

        return jsonify({
            "message": "Video analyzed successfully",
            "frames_processed": frame_count,
            "panic_probability": panic_probability,
            "emergency": emergency
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# --------------------------------
# Run Flask Server
# --------------------------------

if __name__ == '__main__':
    app.run(debug=True)