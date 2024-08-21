import React, { useEffect } from 'react';
import './Navbar.css';
import menuIcon from '../../assets/menu.svg';
import logo from '../../assets/logo.png';
import darkLogo from '../../assets/logo-dark.png';
import uploadIcon from '../../assets/upload.svg';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/DarkModeContext';

const Navbar = ({ toggleSidebar, handleSearchInputChange, onSearch }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  // Effect to update the theme class on the body based on dark mode state
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
  }, [isDarkMode]);

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Call logout function from user context
    navigate('/'); // Navigate to home page after logout
  };

  return (
    <nav className='flex-div'>
      {/* Left section of the navbar */}
      <div className='nav-left flex-div'>
        <img className='menu-icon' src={menuIcon} alt="menu icon" onClick={toggleSidebar} />
        <div className="logo-container">
          <Link to="/">
            <img className={`logo`} src={isDarkMode ? darkLogo : logo} alt="ViewTube logo" />
          </Link>
        </div>
      </div>

      {/* Middle section of the navbar */}
      <div className='nav-middle'>
        <SearchBar onChange={handleSearchInputChange} onSearch={onSearch} />
      </div>

      {/* Right section of the navbar */}
      <div className='nav-right flex-div'>
        
        {/* Conditional rendering based on currentUser */}
        {currentUser ? (
          // Render profile information if user is logged in
          <div className='profile-pic'>
            <Link to="/upload">
              <img className='upload-icon' src={uploadIcon} alt="upload" />
            </Link>
            <Link to="/">
              <img src={currentUser.image} alt='Profile' className="rounded-circle" width="40" height="40" />
            </Link>
            <button className='logout' onClick={handleLogout}>Logout</button>  
          </div>
        ) : (
          // Render login and register links if user is not logged in
          <div className='container-sign'>
            <Link to="/login">
              <p className='log'>Login</p>
            </Link>
            <Link to="/register">
              <p className='reg'>Register</p>
            </Link>
          </div>
        )}
        
        {/* Dark mode toggle */}
        <div className="dark-mode-toggle">
          <input
            className="dark-mode-checkbox"
            type="checkbox"
            id="darkmode-toggle"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <label className="dark-mode-label" htmlFor="darkmode-toggle">
            <span className="dark-mode-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            <span className="dark-mode-slider"></span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
