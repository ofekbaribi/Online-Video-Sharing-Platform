import React, { useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';
import '../RegisterComponents/NewPasswordForm.css'; // Assuming this CSS file exists and is relevant
import eyeIcon from '../../assets/eye.svg';
import eyeSlashIcon from '../../assets/eye-slash.svg';

const PasswordForm = ({ password, setPassword, handlePasswordSubmit, passwordError, setPasswordError }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  // Handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the password state
    if (passwordError) {
      setPasswordError(''); // Clear password error when user starts typing
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="position-relative">
      <div className="mb-3">
        <div className="input-group">
          {/* Password input field */}
          <input
            type={showPassword ? "text" : "password"} // Show plain text or password masked
            className={`form-control input-center ${passwordError ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if passwordError is present
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {/* Button to toggle password visibility */}
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary btn-password-toggle"
              onClick={toggleShowPassword}
            >
              <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ width: '1em', height: '1em' }} />
            </button>
          </div>
        </div>
        {/* Display password error message if present */}
        {passwordError && (
          <div className="invalid-tooltip">
            {passwordError}
          </div>
        )}
      </div>
      {/* Submit button for the form */}
      <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default PasswordForm;
