import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import './Login.css';
import './Register.css';
import NewUsernameForm from '../components/RegisterComponents/NewUsernameForm';
import NewNameForm from '../components/RegisterComponents/NewNameForm';
import NewPasswordForm from '../components/RegisterComponents/NewPasswordForm';
import NewImageForm from '../components/RegisterComponents/NewImageForm';
import logo from '../assets/logo.png';
import InfoIcon from '../assets/info-circle.svg'; 
import { useUser } from '../contexts/UserContext';

const Register = () => {
  // State variables for form inputs and errors
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Navigation hook from React Router
  const navigate = useNavigate();

  // Accessing user context functions and state
  const { addUser, setUser, users } = useUser();

  // Function to validate password format
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  };

  // Function to validate username format
  const validateUsername = (username) => {
    const hasUpperCase = /[A-Z]/.test(username);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(username);
    const isValidLength = username.length >= 2;

    return !(hasUpperCase || hasSpecialChar || !isValidLength); // Return false if invalid
  };

  // Function to validate first and last name format
  const validateName = (firstName, lastName) => {
    const firstNameHasNumber = /\d/.test(firstName);
    const firstNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(firstName);
    const firstNameValidLength = firstName.length >= 2;

    const lastNameHasNumber = /\d/.test(lastName);
    const lastNameHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(lastName);
    const lastNameValidLength = lastName.length >= 2;

    return !(firstNameHasNumber || firstNameHasSpecialChar || !firstNameValidLength || lastNameHasNumber || lastNameHasSpecialChar || !lastNameValidLength);
  };

  // Handle password submission and validation
  const handlePasswordSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password does not meet requirements.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Handle username submission and validation
  const handleUsernameSubmit = () => {
    const user = users.find(user => user.username === username);
    if (user) {
      setUsernameError('Username already exists!');
      return false;
    } else if (!validateUsername(username)) {
      setUsernameError('Username can only contain lowercase letters and be at least 2 characters long.');
      return false;
    } else if (!validateName(firstName, lastName)) {
      setNameError('Invalid name format.');
      return false;
    } else {
      setUsernameError('');
      setNameError('');
      return true;
    }
  };

  // Handle overall form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleUsernameSubmit() && handlePasswordSubmit()) {
      const newUser = { username, firstName, lastName, password, image };
      addUser(newUser); // Add new user to context
      setUser(newUser); // Set current user in context
      navigate('/'); // Navigate to home page after successful registration
    }
  };

  return (
    <div className='login-page'>
      <div className="register-page">
        <div className="login-container">
          {/* Title with logo */}
          <h2 className="d-flex align-items-center">
            Create a <Link to='/'><img src={logo} alt='ViewTube' className="img-fluid h2-img" /></Link> account
          </h2>

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="position-relative">
            {/* Components for username, name, password, and image upload */}
            <NewUsernameForm
              username={username}
              setUsername={setUsername}
              usernameError={usernameError}
              setUsernameError={setUsernameError}
            />
            <NewNameForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              nameError={nameError}
              setNameError={setNameError}
            />
            <NewPasswordForm
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
            <NewImageForm
              setImage={setImage}
              setImagePreview={setImagePreview}
              imagePreview={imagePreview}
            />

            {/* Password requirements */}
            <div id="passwordReq">
              <img src={InfoIcon} alt="Password Requirements" />
              <span className='passwordReq' data-tooltip='Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'>
                Password Guidance
              </span>
            </div>

            {/* Submit button and link to login */}
            <br />
            <button type="submit" className="btn btn-primary">Register</button>
            <br /><br />
            <label htmlFor="member" className="form-label">Already a member?</label>
            <br />
            <Link to="/login">Log in</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
