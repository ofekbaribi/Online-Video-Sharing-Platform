import React from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import '../../pages/Login.css'; // Import additional CSS for Login page styling

const NewNameForm = ({ firstName, setFirstName, lastName, setLastName, nameError, setNameError }) => {
  
  // Function to handle first name input change
  const handleNameChange = (e) => {
    setFirstName(e.target.value); // Update the state with the new first name
    if (nameError) {
      setNameError(''); // Clear name error if it exists
    }
  };

  // Function to handle last name input change
  const handleLastNameChange = (e) => {
    setLastName(e.target.value); // Update the state with the new last name
    if (nameError) {
      setNameError(''); // Clear name error if it exists
    }
  };
  
  return (
    <div className="mb-3">
      {/* Input for first name */}
      <input
        type="text"
        className={`form-control input-center`}
        id="firstName"
        placeholder="First name"
        value={firstName}
        onChange={handleNameChange}
        required
      />
      
      {/* Input for last name */}
      <input
        type="text"
        className="form-control input-center"
        id="lastName"
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
        required
      />
      
      {/* Display nameError if it exists */}
      {nameError && (
        <div className="invalid-tooltip">
          {nameError}
        </div>
      )}
    </div>
  );
};

export default NewNameForm;
