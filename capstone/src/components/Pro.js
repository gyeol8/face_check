import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import Pro from './Pro';
import './css/Pro.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); // 유저 타입 상태 추가

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    if (userType === 'student') {
      setLoggedIn(true); // 학생용 로그인 처리
    } else if (userType === 'professor') {
      // 교수용 로그인 처리 - Pro 컴포넌트로 리디렉션
      window.location.href = '/Pro';
    }
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        <WebcamCapture />
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>User Type:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="">Select User Type</option>
                <option value="student">Student</option>
                <option value="professor">Professor</option>
              </select>
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;