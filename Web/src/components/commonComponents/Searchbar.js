import React, { useState } from 'react';
import searchIcon from '../../assets/search.svg'; // Import the search icon image

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle input change in the search bar
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle search button click
    const handleSearch = () => {
        onSearch(searchQuery); // Call the onSearch function from props with searchQuery as parameter
    };

    // Function to handle enter key press in the search input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Call handleSearch function on pressing Enter key
        }
    };

    return (
        <div className='search-box flex-div'>
            {/* Input field for search */}
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange} // Handle input change event
                onKeyPress={handleKeyPress} // Handle key press event
            />
            {/* Search icon with onClick event */}
            <img
                className='search-icon'
                src={searchIcon}
                alt="Search"
                onClick={handleSearch} // Handle search icon click event
            />
        </div>
    );
};

export default SearchBar;
