import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

export const logIn = (authData) => API.post('/user/login', authData)
export const signUp = (authData) => API.post('/user/signup', authData)
export const saveLocation = (email, countryName, IP, loggedIn, lat, lon ) => API.patch(`/locate/save/${email}`, { countryName, IP, loggedIn, lat, lon })
export const updateLogoutData = ( id, loggedOut ) => API.patch(`/locate/save/logout/${id}`, { loggedOut })
export const getLocationDetails = ( id ) => API.get(`/locate/get/locDetails/${id}`)
