import React from "react";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import home_icon from '../../assets/home.svg';
import fire_icon from '../../assets/fire.svg';
import music_icon from '../../assets/music.svg';

const Sidebar = ({ isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className='shortcut-links'>
                <div className='side-links'>
                    <Link to="/" className="no-link-style">
                        <img src={home_icon} alt="home icon" className="icon" />
                        <p style={{ display: isOpen ? 'contents' : 'contents' ,className:'closed' }}>Home</p>
                    </Link>
                </div>
                <div className='side-links'>
                    <Link to="/" className="no-link-style">
                        <img src={fire_icon} alt="fire icon" className="icon" />
                        <p style={{ display: isOpen ? 'contents' : 'contents' ,className:'closed' }}>Hot Videos</p>
                    </Link>
                </div>
                <div className='side-links'>
                    <Link to="/" className="no-link-style">
                        <img src={music_icon} alt="music icon" className="icon" />
                        <p style={{ display: isOpen ? 'contents' : 'contents' ,className:'closed'}}>Music</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
