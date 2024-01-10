import React, { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import white from "../../assets/background.jpg";
import { setCurrentUser } from "../../actions/currentUser";
import "./VideoPlayer.css";
import { useTheme } from "../../ThemeContext";

const VideoPlayer = ({ videoUrl }) => {

  const videoRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [VideoDuration, setVideoDuration] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useTheme()

  var User = useSelector((state) => (state.currentUserReducer));

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDoubleClick = (event) => {

    const clickTime = new Date().getTime();
    const tapInterval = clickTime - lastTap

    if (tapInterval < 500 && tapInterval > 0){
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;

      let a = rect.width / 2.7;
      let b = rect.width / 3.8;

      if (x > a + b) {            // right
        videoRef.current.currentTime += 10;
      }
      
      if (x > a && x < a + b) {   // middle
        togglePlayPause();
      }
      
      if (x < a) {      // left
        videoRef.current.currentTime -= 5;
    }
    }else{
      setLastTap(clickTime);
    }
  };

  const handleMouseDown =() => {
    setIsHolding(true);
    videoRef.current.playbackRate = 2;
  }

  const handleMouseUp =() => {
    setIsHolding(false);
    videoRef.current.playbackRate = 1;
  }

  const formatedTime = (times) => {
    const result = new Date(times * 1000).toISOString().substring(14, 19);
    return result;
  };

  const handleReplay = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleChange = (e) => {
    const changedTime = parseFloat(e.target.value);
    setCurrentTime(changedTime);
    videoRef.current.currentTime = changedTime;
  };

  const handleAuth = () => {
    toast.error("Please Login first to play the Video")
    navigate('/Auth')
  }

  useEffect(() => {
    dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch])
  

  return (
    <>
      <div className="video-wrap">
        <video
          ref={videoRef}
          poster={theme === 'day' ? "" : white}
          className={theme === 'day' ? "video-player" : "video-player-dark"}
          onCanPlayThrough={() => {
            setVideoDuration(videoRef.current.duration);
            setIsLoading(false);
          }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleReplay}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {User === null ? (
          <div className="video-overlay">
            {isLoading ? "Loading..." : ""}
            <div className="time">
              <span>{formatedTime(currentTime)}</span>
              <span>{formatedTime(VideoDuration)}</span>
            </div>
            <div className="progress-bar" id="progress-bar">
              <input
                type="range"
                min={0}
                max={VideoDuration}
                step={1}
                value={currentTime}
                onChange={handleChange}
              />
            </div>
          </div>
        ): (
          <div
            className="video-overlay"
            onClick={handleDoubleClick}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {isLoading ? "Loading..." : ""}
            <div className="time">
              <span>{formatedTime(currentTime)}</span>
              <span>{formatedTime(VideoDuration)}</span>
            </div>
            <div className="progress-bar" id="progress-bar">
              <input
                type="range"
                min={0}
                max={VideoDuration}
                step={1}
                value={currentTime}
                onChange={handleChange}
                style={{ backgroundColor: "red", color: "#d72f2f" }}
              />
            </div>
          </div>
        )}
      </div>
      {User === null ? (
        <Link
          to='/Auth'
          onClick={handleAuth}
          className="btn btn-primary play-pause-btn"
          style={{ marginTop: "30px" }}
        >
          {isPlaying ? "Pause" : "Play"}
        </Link>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {currentTime === VideoDuration ? (
            <button className="btn btn-primary play-pause-btn" onClick={togglePlayPause}>
              {isPlaying ? "Play" : "Replay"}
            </button>
          ) : (
            <button className="btn btn-primary play-pause-btn" onClick={togglePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
