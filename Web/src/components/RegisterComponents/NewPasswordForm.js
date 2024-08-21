import React, { useState } from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import '../../pages/Login.css'; // Import additional CSS for Login page styling
import './NewPasswordForm.css'; // Import specific CSS for the new password form
import eyeIcon from '../../assets/eye.svg'; // Import eye icon for showing password
import eyeSlashIcon from '../../assets/eye-slash.svg'; // Import eye slash icon for hiding password

const NewPasswordForm = ({ password, setPassword, confirmPassword, setConfirmPassword, passwordError, setPasswordError }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  // Toggle the visibility of the password
  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  // Toggle the visibility of the confirm password
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword);
  };

  // Handle changes in the password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the password state with the new value
    if (passwordError) {
      setPasswordError(''); // Clear password error if it exists
    }
  };

  // Handle changes in the confirm password input
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // Update the confirm password state with the new value
    if (passwordError) {
      setPasswordError(''); // Clear password error if it exists
    }
  };

  return (
    <div className="mb-3">
      {/* Password input group */}
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
          className={`form-control input-center ${passwordError ? 'is-invalid' : ''}`} // Apply error class if passwordError exists
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
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

      {/* Confirm password input group */}
      <div className="input-group">
        <input
          type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
          className={`form-control input-center ${passwordError ? 'is-invalid' : ''}`} // Apply error class if passwordError exists
          id="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-secondary btn-password-toggle"
            onClick={toggleShowConfirmPassword}
          >
            <img src={showConfirmPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" style={{ width: '1em', height: '1em' }} />
          </button>
        </div>
      </div>

      {/* Display password error if it exists */}
      {passwordError && (
        <div className="invalid-tooltip">
          {passwordError}
        </div>
      )}
    </div>
  );
};

export default NewPasswordForm;
