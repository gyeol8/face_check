import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import AttendanceTable from './components/Attendance';
import WebcamCapture from './components/WebcamCapture';
import './App.css';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/'); // API 엔드포인트
        setData(response.data); // 데이터 상태 업데이트
      } catch (err) {
        setError(err); // 에러 상태 업데이트
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData(); // 비동기 함수 호출
  }, []);

  // 로딩 중일 때 표시할 내용
  if (loading) return <p>Loading...</p>;

  // 에러 발생 시 표시할 내용
  if (error) return <p>Error: {error.message}</p>;




  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/attendance" element={<AttendanceTable />} />
          <Route path="/webcamcapture" element={<WebcamCapture />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
