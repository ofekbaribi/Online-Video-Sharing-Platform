
import React from 'react';
import VideoList from '../homePage/VideoList'; 
import './Feed.css'; 

const Feed = ({ searchQuery, videos }) => {
    return (
        <div className="feed">
            <VideoList searchQuery={searchQuery} videos={videos}/>
        </div>
    );
};

export default Feed;