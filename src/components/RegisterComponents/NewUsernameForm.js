// src/components/RegisterComponents/UsernameForm.js
import React from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import '../../pages/Login.css'; // Import additional CSS for Login page styling

const NewUsernameForm = ({ username, setUsername, usernameError, setUsernameError }) => {
  // Handle changes in the username input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Update the username state with the new value
    if (usernameError) {
      setUsernameError(''); // Clear username error if it exists
    }
  };

  return (
    <div className="mb-3">
      {/* Username input field */}
      <input
        type="text" // Set the input type to text
        className={`form-control input-center`} // Apply Bootstrap form control and custom center styling
        id="username" // Set the id for the input
        placeholder="Enter your username" // Placeholder text for guidance
        value={username} // Controlled input value bound to the username state
        onChange={handleUsernameChange} // Call handleUsernameChange on input change
        required // Make the input field required
      />
      {/* Display username error if it exists */}
      {usernameError && (
        <div className="invalid-tooltip">
          {usernameError}
        </div>
      )}
    </div>
  );
};

export default NewUsernameForm;
