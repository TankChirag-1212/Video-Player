import React from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

import video from '../../assets/video2.mp4';
import './Home.css';


const Home = () => {

    const videoUrl = video;

    return (
        <div className="video-container">
            <h1 className='main-h1'>Your Video Player App</h1>
            <VideoPlayer videoUrl={videoUrl} />
        </div>
    )
}

export default Home