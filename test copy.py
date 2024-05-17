from flask import Flask, render_template, Response
import cv2
import os
import time

app = Flask(__name__)


cap = cv2.VideoCapture(0) # 노트북 웹캠을 카메라로 사용
cap.set(3, 640) # 너비
cap.set(4, 480) # 높이

# main.py

class FaceRecognitionSystem:
    def recognize_face(self, image):
        # 얼굴 인식 기능을 구현하는 코드
        pass


# 이미지를 저장할 디렉토리 생성
output_dir = './captured_faces'
os.makedirs(output_dir, exist_ok=True)

def capture_frame(frame):
    # 캡처된 이미지 저장
    capture_filename = os.path.join(output_dir, f'capture_{int(time.time())}.jpg')
    cv2.imwrite(capture_filename, frame)
    print(f'Captured frame saved as {capture_filename}')

def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            frame = cv2.flip(frame, 1)  # 좌우 대칭
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
             # 키보드 입력 처리
            key = cv2.waitKey(1) & 0xFF
            if key == 27:
                # 캡처된 이미지 저장
                capture_frame(frame)


#경로들 
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup_main.html')

@app.route('/signup_pro')
def signup_pro():
    return render_template('signup_pro.html')

@app.route('/signup_std')
def signup_std():
    return render_template('signup_std.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
