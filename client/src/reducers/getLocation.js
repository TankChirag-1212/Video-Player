const getLocationReducer = (state = { data: null}, action) => {
    switch (action.type) {
        case "LOCATION":
            return { ...state };
        case "LOGOUT_DATA":
            return { ...state };
        case "GET_LOCATION_DATA":
            return { ...state, data: action.payload };
        default: 
            return state;
    }
}

export default getLocationReducer;