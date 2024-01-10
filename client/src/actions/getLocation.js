import * as api from '../api'

export const saveLocationData = (locationData) => async (dispatch) => {
    try {
        const { email, countryName, IP, loggedIn, lat, lon } = locationData 
        const { data } = await api.saveLocation( email, countryName, IP, loggedIn, lat, lon )
        dispatch({type:"LOCATION", payload:data})
    } catch (error) {
        console.error("Internal Server Error: ",error)
    }
}

export const saveLoggedOutData = (logoutData) => async (dispatch) => {
    try {
        const { id, loggedOut } = logoutData;
        const { data } = await api.updateLogoutData( id, loggedOut )
        dispatch({type:"LOGOUT_DATA", payload:data})
    } catch (error) {
        console.error("Internal Server Error: ",error)
    }
}

export const locationDetails = (id) => async (dispatch) => {
    try {
        const { data } = await api.getLocationDetails(id)
        dispatch({ type:"GET_LOCATION_DATA", payload: data})
    } catch (error) {
        console.error("Internal Server Error: ", error)
    }
}
