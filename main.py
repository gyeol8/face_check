import face_recognition
import cv2
import dlib
from time import sleep
import numpy as np
import keyboard
import json
import joblib
import os

def get_face_img(name):
    '''
    학습할 이미지 30장을 가져오는 함수
    '''
    detector = dlib.get_frontal_face_detector()
    cap = cv2.VideoCapture(0)
    cv2.waitKey(2000)

    # 폴더 생성
    try:
        os.mkdir(f'imgs/{name}')
    except:
        pass

    cnt = 0

    while cnt < 31:
        ret, frame = cap.read()

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # 얼굴 검출
        dlib_faces = detector(rgb_frame)
        cv2.imshow("Webcam Face Detection", frame)

        if len(dlib_faces) == 1:
            print(f'{cnt+1} 장 캡쳐 완료')
            cv2.imwrite(f"./imgs/{name}/{cnt}.png", frame)
            cnt += 1

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        # 캡처 객체 해제 및 모든 윈도우 닫기
    cap.release()
    cv2.destroyAllWindows()


def user_face_compare_data():
    '''
    cv2 웹 캠에 이미지가 감지 되면 어떤 사람인지 출력하는 함수
    '''
    detector = dlib.get_frontal_face_detector()
    cap = cv2.VideoCapture(0)

    cnt = 0

    while True:
        ret, frame = cap.read()

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # 얼굴 검출
        dlib_faces = detector(rgb_frame)

        cv2.imshow("Webcam Face Detection", frame)

        if len(dlib_faces) == 1:
            cv2.imwrite(f"./test.png", frame)
            try:
                model_predict('./test.png')
            except:
                pass

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


def encoding_img(img_path):
    '''
    이미지의 얼굴 특징을 파악해 얼굴 데이터를 반환 해주는 함수
    '''
    image = face_recognition.load_image_file(img_path)
    face_encodings = face_recognition.face_encodings(image)
    return face_encodings


def get_face_location_data():
    '''
    imgs 폴더 안에 얼굴 이미지를 가져 와
    딥러닝 모델 학습을 진행하는 코드
    '''
    # 값은 128, 1 shape
    x = []
    y = []
    from glob import glob

    for i in glob('./imgs/*'):
        name = i.split('\\')[1]
        for j in range(1, len(glob(f'./imgs/{name}/*.png'))):
            print(f'{name} 폴더 이미지 특징 값 추출 중 ..')
            encoding = encoding_img(glob(f'./imgs/{name}/*.png')[j])

            if len(encoding) == 0:
                continue

            x.append(encoding[0])
            y.append(name)
            print(f'{name} 폴더 이미지 특징 값 추출 완료')
            print('=' * 30)

    # 테스트
    # for i in range(len(x)):
    #     print(f'{y[i]} : {x[i]}')

    print(len(x))
    print(len(y))
    return x, y


def model_create(X, y):
    from sklearn.svm import SVC
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # SVM 모델 생성 및 훈련
    svm = SVC(kernel='rbf', C=1.0, gamma='scale')  # RBF 커널 사용
    svm.fit(X_train, y_train)

    # 테스트 데이터로 예측
    y_pred = svm.predict(X_test)
    
    # 모델 저장
    joblib.dump(svm, 'svm_model.pkl')

    # 정확도 평가
    accuracy = accuracy_score(y_test, y_pred)
    print("Accuracy:", accuracy)


def model_predict(img_path):
    # 모델 로드 및 예측 함수
    loaded_model = joblib.load('./svm_model.pkl')

    predict_data = encoding_img(img_path)[0]
    predict_data = predict_data.reshape(1, -1)

    # 로드된 모델을 사용하여 예측
    new_prediction = loaded_model.predict(predict_data)
    print(new_prediction)


def face_img_get():
    name = input('이름 : ')
    get_face_img(name)
    exit()


if __name__ == "__main__":
    # face_img_get 함수 얼굴 체크
    face_img_get()

    x, y = get_face_location_data()
    model_create(x, y)