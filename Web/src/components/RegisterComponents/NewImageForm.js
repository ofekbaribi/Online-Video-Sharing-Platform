import React from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import '../../pages/Login.css'; // Import additional CSS for Login page styling

const NewImageForm = ({ setImage, setImagePreview, imagePreview }) => {
  
  // Function to handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a new FileReader instance
    
    // Event listener when FileReader has successfully loaded the file
    reader.onloadend = () => {
      setImage(reader.result); // Set the base64 string of the image to state
      setImagePreview(reader.result); // Set the image preview URL to state
    };
    
    // If a file is selected, start reading it as a data URL
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      {/* Label for file input */}
      <label className="form-label" htmlFor="profilePicture">Upload profile picture</label>
      
      {/* File input element */}
      <input 
        type="file" 
        className="form-control" 
        id="profilePicture" 
        onChange={handleImageChange} 
        required
      />
      
      {/* Display image preview if imagePreview state has a value */}
      {imagePreview && 
        <div className='image-preview-container'> 
          <img src={imagePreview} alt="Preview" className="mt-2" />
        </div>
      }
    </div>
  );
};

export default NewImageForm;
