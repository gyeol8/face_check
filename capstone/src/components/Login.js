import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import Pro from './Pro';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('student'); // 학생을 기본값으로 설정

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setLoggedIn(true);
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        userType === 'student' ? <WebcamCapture /> : <Pro />
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
              <select value={userType} onChange={(e) => setUserType(e.target.value)}>
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
