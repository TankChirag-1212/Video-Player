const authReducer = (state = { data: null, isSignUp: false }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem("Profile", JSON.stringify({...action?.data}))
            return {...state, data: action?.data}
        case 'LOGOUT':
            localStorage.clear()
            return {...state, data: null}
        case 'SET_SIGN_UP':
            return {...state, isSignUp: action.payload}
        default:
            return state
    }
}

export default authReducer;