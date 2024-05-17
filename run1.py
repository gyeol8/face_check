from flask import Flask, render_template, Response
import cv2
import os
import time
from main import user_face_compare_data, model_predict

app = Flask(__name__)


cap = cv2.VideoCapture(0) # 노트북 웹캠을 카메라로 사용
cap.set(3, 640) # 너비
cap.set(4, 480) # 높이


# 이미지를 저장할 디렉토리 생성
output_dir = './captured_faces'
os.makedirs(output_dir, exist_ok=True)


def capture_frame(frame):
    capture_filename = './test.png'
    with open(capture_filename, 'wb') as f:
        f.write(frame)
    try:
        model_predict('./test.png')
    except:
        pass


def generate_frames():
    while True:
        success, frame = cap.read()

        if not success:
            break

        frame = cv2.flip(frame, 1)  # 좌우 대칭
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        capture_frame(frame)

#경로들 
@app.route('/')
def index():
    return render_template('index.html')

#로그인
@app.route('/login')
def login():
    return render_template('login.html')
#회원가입 메인창
@app.route('/signup_main')
def signup():
    return render_template('signup_main.html')
#회원가입 교수란
@app.route('/signup_pro')
def signup_pro():
    return render_template('signup_pro.html')
#회원가입 학생란
@app.route('/signup_std')
def signup_std():
    return render_template('signup_std.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)
