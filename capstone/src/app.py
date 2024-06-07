from flask import Flask, render_template, Response, request, redirect
from flask_cors import CORS
import cv2
import os
import time
from main import user_face_compare_data, model_predict, get_face_img

app = Flask(__name__)
CORS(app)  # Allow CORS

cap = cv2.VideoCapture(0)  # 노트북 웹캠을 카메라로 사용
cap.set(3, 400)  # 너비
cap.set(4, 400)  # 높이

capturing = False

def capture_frame(frame):
    if not get_face_img(frame):
        print('30장 끝')
        return False
    return True

def generate_frames():
    while capturing:
        success, frame = cap.read()
        if not success:
            break

        frame = cv2.flip(frame, 1)  # 좌우 대칭
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        if not capture_frame(frame):
            break

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_capture', methods=['POST'])
def start_capture():
    global capturing
    capturing = True
    return '', 204

@app.route('/stop_capture', methods=['POST'])
def stop_capture():
    global capturing
    capturing = False
    return '', 204

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/signup_face', methods=['POST'])
def signup_face():
    data = request.json
    with open('./User_Info.txt', 'w', encoding='UTF-8') as f:
        f.write(f"{data['student_id']}, {data['user_name']}, {data['department']}, {data['email']}")
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
