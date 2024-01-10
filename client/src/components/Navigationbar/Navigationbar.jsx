import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import "./Navigationbar.css";
import { setCurrentUser } from '../../actions/currentUser';
import { saveLoggedOutData } from '../../actions/getLocation';
import { setSignUp } from '../../actions/auth';
import { useTheme } from "../../ThemeContext";

const Navigationbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme, toggleTheme, setDefaultTheme } = useTheme();
  const [hasToggledTheme, setHasToggledTheme] = useState(false)

  var User = useSelector((state) => (state.currentUserReducer))
  const handleLogout = () => {
    const loggedOut = new Date();
    
    dispatch(saveLoggedOutData({ id: User?.result?._id, loggedOut}))
    if(hasToggledTheme === false){
      setDefaultTheme()
    }
    dispatch({ type: 'LOGOUT'}) 
    navigate('/')
    dispatch(setCurrentUser(null))
  }

  const handleRedirect = () => {
    toast.error("Please Login first")
  }

  const handleSignUp = () => {
    dispatch(setSignUp(true))
  }
  const handleLogIn = () => {
    dispatch(setSignUp(false))
  }

  const handleTheme = () => {
    toggleTheme()
    if(User){
      setHasToggledTheme(true)
    }
    theme === 'day' ? localStorage.setItem('theme', 'night') : localStorage.setItem('theme', 'day')
  }

  useEffect(() => {
    
    dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch])
  


  return (
    <nav className={theme === 'day' ? "navbar custom-nav navbar-expand-lg bg-body-tertiary bg-dark" : "navbar custom-nav-dark navbar-expand-lg bg-body-tertiary"} data-bs-theme={theme === 'day' ? 'dark': 'light'}>
      <div className="container-fluid">
        <Link to="/" className={theme === 'day' ? "navbar-brand fw-semibold fs-5": "navbar-brand fw-semibold fs-5 brand-logo-dark"}>
          VLC Player
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={theme === 'day' ? "navbar-toggler-icon" : "navbar-toggler-icon toggler-icon-dark"}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={theme === 'day' ? "nav-link active" : "nav-link nav-link-dark"} aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ContactUs" className={theme === 'day' ? "nav-link" : "nav-link nav-link-dark"}>
                Contact Us
              </Link>
            </li>
            {User !== null ?
            (<li className="nav-item">
              <Link to={`/UserAct/${User?.result?._id}`} className={theme === 'day' ? "nav-link" : "nav-link nav-link-dark"}>
                User Activity
              </Link>
            </li>) : (
            <li className="nav-item">
              <Link to='/Auth' onClick={handleRedirect} className={theme === 'day' ? "nav-link" : "nav-link nav-link-dark"}>
                User Activity
              </Link>
            </li>)}
          </ul>
          {User !== null ? (
            <ul className="navbar-nav mb-1 mt-1">
              <li className="nav-item">
                <button type="button" className={theme === 'day' ? "btn btn-primary m-1" : "btn m-1 btn-outline-info"} onClick={handleTheme}>{theme === 'day' ? "Dark":"Light"}</button>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={handleLogout} className={theme === 'day' ? "btn btn-primary m-1": "btn btn-outline-info m-1"}>LogOut</Link>
              </li>
            </ul>
          ) : (
          <ul className="navbar-nav mb-1 mt-1 d-flex flex-row">
            <li className="nav-item">
              <button type="button" className={theme === 'day' ? "btn btn-primary m-1" : "btn m-1 btn-outline-info"} onClick={handleTheme}>{theme === 'day' ? "Dark":"Light"}</button>
            </li>
            <li className="nav-item">
              <Link to="/Auth" onClick={handleLogIn} className={theme === 'day' ? "btn btn-primary m-1": "btn btn-outline-info m-1"}>LogIn</Link>
            </li>
            <li className="nav-item">
              <Link to="/Auth" onClick={handleSignUp} className={theme === 'day' ? "btn btn-primary m-1": "btn btn-outline-info m-1"}>SignUp</Link>
            </li>
          </ul>)}
          
        </div>
      </div>
    </nav>
  );
};

export default Navigationbar;
