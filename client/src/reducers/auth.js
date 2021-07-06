import { 
    AUTH_SIGN_UP, 
    AUTH_SIGN_OUT, 
    AUTH_SIGN_IN, 
    AUTH_ERROR } from "../actions/types"

const DEFAULT_STATE = {
    isAuthenticated:false,
    token:"",
    errorMessage: ""
}

// Step 1: Define a reducer

const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case AUTH_SIGN_UP:
            console.log("[AuthReducer] got an AUTH_SIGN_UP action")
            return {...state, isAuthenticated: true, token: action.payload, errorMessage: ''}
        case AUTH_SIGN_IN:
            console.log("[AuthReducer] got an AUTH_SIGN_IN action")
            return {...state, isAuthenticated: true, token: action.payload, errorMessage: ''}    
        case AUTH_SIGN_OUT:
            return {...state, isAuthenticated: false, token: action.payload, errorMessage: ''}    
        case AUTH_ERROR:
            console.log("[AuthReducer] got an AUTH_ERROR action")
            return {...state, errorMessage: action.payload}
        default:
            return state;    
    }
}

export default authReducer;