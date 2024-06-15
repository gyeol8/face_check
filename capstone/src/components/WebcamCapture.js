import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './css/Webcamcapture.css'; 
import { useNavigate } from 'react-router-dom';

const WebcamCapture = () => {
  const [capturing, setCapturing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null); // 예측 결과 상태 추가
  const webcamRef = useRef(null);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 정의

  const captureImages = () => {
    setCapturing(true);
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context.getImageData(0, 0, image.width, image.height);
      const rgbArray = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        rgbArray.push([red, green, blue]);
      }
      sendRGBValues(rgbArray);
    };
  };

  const sendRGBValues = (rgbArray) => {
    fetch('http://127.0.0.1:5000/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Image: rgbArray })
    })
    .then(response => {
      // 서버로부터의 응답 처리
    })
    .catch(error => {
      console.error('Error sending RGB values:', error);
    })
    .finally(() => {
      setCapturing(false);
    });
  };

  const predictImage = () => {
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Image: "test"})      
    })
    .then(response => {     
      return response.json();
    })
    .then(data => {
      // 서버로부터 받은 예측 결과를 상태에 저장
      setPredictionResult(data.data);
    })
    .catch(error => {
      console.error('Error predicting image:', error);
    })
    .finally(() => {
      setCapturing(false);
    });
  };
  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="webcam-container">
      <div className="webcam-controls">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      {capturing ? (
        <div>Capturing image...</div>
      ) : (
        <div>
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
            ref={webcamRef}
          />
          <button onClick={captureImages}>Start Capture</button>
          <button onClick={predictImage}>Predict</button>
          {/* 예측 결과 출력 */}
          {predictionResult && <div>안녕하세요 [{predictionResult.split('-')[1]}] 님</div>}
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
