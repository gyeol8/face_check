import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AttendanceTable from './components/Attendance';
import WebcamCapture from './components/WebcamCapture';
import './App.css';


function App() {
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
