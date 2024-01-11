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
