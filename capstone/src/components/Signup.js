import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './css/Login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState(''); // 직급 상태 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [capturedImages, setCapturedImages] = useState([]);
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const captureImages = () => {
    let count = 0;
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImages((prevImages) => [...prevImages, imageSrc]);
        count += 1;
        if (count >= 30) {
          clearInterval(interval);
        }
      }
    }, 100); // 100ms 간격으로 사진 캡처
  };

  const uploadImages = async (images) => {
    // 이미지 업로드 함수 구현
    // 예: 서버에 이미지 업로드 후 폴더 경로 반환
    // const response = await fetch('/upload', {
    //   method: 'POST',
    //   body: JSON.stringify({ images }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const data = await response.json();
    // return data.folderPath;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    if (capturedImages.length < 30) {
      alert("사진 30장을 캡처해주세요.");
      return;
    }

    const imageFolder = await uploadImages(capturedImages);

    const data = {
      Name: name,
      Student_ID: studentID,
      Department: department,
      Position: position, // 직급 추가
      Image_Folder: imageFolder
    };

    const response = await fetch('/your-flask-endpoint', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (result.error) {
      alert("인식 실패");
    } else {
      alert("출석 체크 완료");
      navigate('/');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이름:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>학번:</label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>학과:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>직급:</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          >
            <option value="">직급을 선택하세요</option>
            <option value="교수">교수</option>
            <option value="학생">학생</option>
          </select>
        </div>
        <div className="form-group">
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호 확인:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>캡처된 사진 수: {capturedImages.length}</label>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button type="button" onClick={captureImages}>사진 30장 자동 캡처</button>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
