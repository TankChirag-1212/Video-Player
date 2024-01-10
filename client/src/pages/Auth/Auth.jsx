import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import "./Auth.css";
import { signup, login, setSignUp } from '../../actions/auth';
import { saveLocationData } from "../../actions/getLocation";
import { useTheme } from "../../ThemeContext";

const Auth = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [details, setDetails] = useState(null);

    const isSignUp = useSelector((state) => state.authReducer.isSignUp)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { theme, toggleTheme, setDefaultTheme } = useTheme()

    const handleSwitch = () => {
        dispatch(setSignUp(!isSignUp));
    };

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await fetch("https://geolocation-db.com/json/b072f2c0-9d28-11ee-9883-9fb240147f5c")
                const data = await response.json()

                setDetails(data);         
            } catch (error) {
                console.error('Error fetching the GeoLocation Api: ', error);
            }
        }
        fetching(); 
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const storedTheme = localStorage.getItem('theme')
        
        if (!email && !password) {
            toast.error("Enter email and password")
        }
        else if(isSignUp) {
            if(!name){
                toast.error("Please enter your Name")
            }
            dispatch(signup({ name, email, password }, navigate))
            dispatch(setSignUp(false))
        }else {
            dispatch(login({ email, password }, navigate))
        }
        
        const currentHour = new Date().getHours();
        const isNight = currentHour <= 6 || currentHour >= 19;

        if(storedTheme){
            setDefaultTheme()
            isNight ? toggleTheme() : setDefaultTheme()
            isNight ? localStorage.setItem('theme', 'night') : localStorage.setItem('theme', 'day')
            
        }else{
            isNight ? toggleTheme() : setDefaultTheme();
            isNight ? localStorage.setItem('theme', 'night') : localStorage.setItem('theme', 'day')
        }
    }

    const handleLocation = () => {
        const loggedInTime = new Date()
        dispatch(saveLocationData({ email, countryName:details.country_name, IP:details.IPv4, loggedIn: loggedInTime, lat: details.latitude, lon: details.longitude}))
    }

    return (
    <section className={theme === 'day' ? "auth-card" : "auth-card-dark"}>
    <div className={theme === 'day' ? "main-div1" : "main-div1-dark"}>
        {isSignUp ? <h2>Register</h2> : <h2>Login</h2>}
        <div className="main-div2">
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <label htmlFor="name">
                        <h4>User Name</h4>
                        <input type="text" id="name" autoComplete="off" placeholder="Enter Your Name" onChange={(e) => {setName(e.target.value)}}/>
                    </label>
                )}
                <label htmlFor="email">
                    <h4>Email</h4>
                    <input type="email" id="email" placeholder="default@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
                </label>
                <label htmlFor="pass">
                    <h4>Password</h4>
                    <input type="password" id="pass" autoComplete="off" placeholder="Enter Your Password" onChange={(e) => {setPassword(e.target.value)}}/>
                </label>
                <button type="submit" onClick={handleLocation} className="btn btn-primary submit-btn">
                        {isSignUp ? "Register" : "Log In"}
                </button>
            </form>
            <p className="auth-para" style={{display:'flex', justifyContent:'center'}}>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                    type="button"
                    className="switch-btn"
                    onClick={handleSwitch}
                >
                {isSignUp ? "Log in" : "Register"}
                </button>
            </p>
        </div>
    </div>
    </section>
    );
};

export default Auth;
