// src/app/App.js
import './App.css';
import Home from '../pages/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VideoWatch from '../pages/VideoWatch';
import Upload from '../pages/Upload';
import { VideosProvider } from '../contexts/VideosContext';
import { UserProvider } from '../contexts/UserContext';
import { CommentsProvider } from '../contexts/CommentsContext';
import { ThemeProvider } from '../contexts/DarkModeContext';
import { useVideos } from '../contexts/VideosContext';

function App() {
  return (
    <UserProvider>
      <VideosProvider>
        <CommentsProvider>
          <ThemeProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/video/:videoId" element={<VideoWatch/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/upload" element={<Upload/>} />
                  <Route path="/" element={<Home/>} />
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
        </CommentsProvider>
      </VideosProvider>
    </UserProvider>
  );
}

export default App;
