import React from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import '../../pages/Login.css'; // Import additional CSS for Login page styling

const UsernameForm = ({ username, setUsername, handleUsernameSubmit, usernameError, setUsernameError }) => {
  
  // Function to handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Update the username state
    if (usernameError) {
      setUsernameError(''); // Clear username error when user starts typing
    }
  };

  return (
    <form onSubmit={handleUsernameSubmit} className="position-relative">
      <div className="mb-3">
        {/* Username input field */}
        <input
          type="text"
          className={`form-control input-center ${usernameError ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if usernameError is present
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        {/* Display username error message if present */}
        {usernameError && (
          <div className="invalid-tooltip">
            {usernameError}
          </div>
        )}
      </div>
      {/* Submit button for the form */}
      <button type="submit" className="btn btn-primary">Next</button>
    </form>
  );
};

export default UsernameForm;
