import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reducers from './reducers';
import { logIn, signUp, saveLocation, updateLogoutData, getLocationDetails }  from './api/index';


let Api = { logIn, signUp, saveLocation, updateLogoutData, getLocationDetails }

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: Reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
      extraArgument: { Api }
    }
  })
})

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer/>
    </React.StrictMode>
  </Provider>
);