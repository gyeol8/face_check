import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const [capturing, setCapturing] = useState(false);
  const [images, setImages] = useState([]);
  const webcamRef = useRef(null);

  const captureImages = () => {
    setCapturing(true);
    let capturedImages = [];
    let captureCount = 0;

    const captureInterval = setInterval(() => {
      if (captureCount < 30) {
        const imageSrc = webcamRef.current.getScreenshot();
        capturedImages.push(imageSrc);
        captureCount += 1;
      } else {
        clearInterval(captureInterval);
        setImages(capturedImages);
        setCapturing(false);
      }
    }, 33); // 30 frames per second (1000ms / 30 = ~33ms)
  };

  return (
    <div className="webcam-container">
      {capturing ? (
        <div>Capturing images...</div>
      ) : images.length > 0 ? (
        <div>Capture complete. {images.length} images captured.</div>
      ) : (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button onClick={captureImages}>Start Capture</button>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
