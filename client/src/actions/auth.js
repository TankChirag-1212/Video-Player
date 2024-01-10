import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(authData)
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/Auth')
    } catch (error) {
        console.log(error)
    }
}

export const login = (authData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.logIn(authData)
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error)
        alert("Your Email or Password is incorrect")
    }
}

export const setSignUp = (isSignUp) => {
    return { type: 'SET_SIGN_UP', payload: isSignUp }
}