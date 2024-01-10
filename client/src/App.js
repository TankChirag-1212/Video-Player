import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import Navigation from './components/Navigationbar/Navigationbar';
import AllRoutes from './AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { locationDetails } from './actions/getLocation';
import { setTheme } from './actions/theme';
import { ThemeProvider, useTheme } from './ThemeContext';

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === 'day' ? 'app-style' : 'app-style-dark'}>
      <Navigation/>
      <AllRoutes/>
    </div>
  );
};

const App = () => {
    return (
      <ThemeProvider>
        <Router>
          <AppContent/>
        </Router>
      </ThemeProvider>
    );
};

export default App;



    // const dispatch = useDispatch()
    // var User = useSelector(state => state.currentUserReducer)
    // // useEffect(() => {
    // //   if(User?.result?._id){
    // //     const id = User?.result?._id
        
    // //     const determineTheme = async () => {
    // //       try {
    // //           const response = await fetch(`http://localhost:5000/locate/get/latAndLong/${id}`)
    // //           const LatAndLon = await response.json();
    // //           const { lat, lon } = LatAndLon.data
              
    // //           const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c5bbe3400f209d4abde867163431daf&units=metric`)
    // //           const weatherData = await weatherResponse.json()
    // //           const isNight = weatherData.weather[0].icon.includes('d');
              
    // //           dispatch(setTheme(isNight ? false : true));
    // //       } catch (error) {
    // //           console.error('Error fetching the Api Key', error);
    // //       }
    // //     }
    // //     determineTheme(); 
    // //   }
    // // }, [User?.result?._id])
    
    // // useEffect(() => {
    // //   const determineTheme = () => {
    // //     const currentHour = new Date().getHours();
        
    // //     const isNight = currentHour <= 6 || currentHour >= 19;

    // //     dispatch(setTheme(!isNight))
    // //   }
    // //   determineTheme()
    // // },[])

    // const themeData = useSelector(state => state.themeReducer)
    // const isDay = themeData.theme