import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import './Login.css';
import UsernameForm from '../components/LoginComponents/UsernameForm';
import PasswordForm from '../components/LoginComponents/PasswordForm';
import logo from '../assets/logo.png';
import { useUser } from '../contexts/UserContext';

const Login = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Router navigation hook
  const navigate = useNavigate();

  // User context
  const { setUser, users } = useUser();

  // Handle form submission when username is submitted
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      setUsernameError('Please fill out this field.');
    } else if (!users.find(user => user.username === username)) {
      setUsernameError('User name does not exist!');
    } else {
      setUsernameError('');
      setIsUsernameSubmitted(true); // Proceed to password form
    }
  };

  // Handle form submission when password is submitted
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const detailsMatching = users.find(user => user.username === username && user.password === password);
    if (detailsMatching) {
      setUser(detailsMatching); // Set user context
      alert('Login successful'); // Notify user
      navigate('/'); // Redirect to home page
    } else {
      setPasswordError('Invalid username or password.');
    }
  };

  // Clear password error message
  const clearPasswordError = () => {
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <div className='login-page'>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-container">
          {/* Title with logo */}
          <h2 className="d-flex align-items-center">
            Sign into your <Link to='/'><img src={logo} alt='ViewTube' className="img-fluid h2-img" /></Link> account
          </h2>

          {/* Conditional rendering based on whether username is submitted */}
          {!isUsernameSubmitted ? (
            // Username form component
            <UsernameForm
              username={username}
              setUsername={setUsername}
              handleUsernameSubmit={handleUsernameSubmit}
              usernameError={usernameError}
              setUsernameError={setUsernameError}
            />
          ) : (
            // Password form component
            <PasswordForm
              password={password}
              setPassword={setPassword}
              handlePasswordSubmit={handlePasswordSubmit}
              clearPasswordError={clearPasswordError}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
          )}

          {/* Link to register */}
          <br />
          <label htmlFor="member" className="form-label">New here?</label>
          <br />
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
