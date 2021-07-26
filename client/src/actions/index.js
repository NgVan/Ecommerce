import axios from 'axios'
import {
    AUTH_REGISTER, 
    AUTH_SIGN_UP, 
    AUTH_SIGN_OUT,
    AUTH_SIGN_IN, 
    AUTH_ERROR, 
    DASHBOARD_GET_DATA } from './types'

// Step 4: Dispatch action to update redux state
//          The only way to mutate internal state is to dispatch action

/*
    ActionCreator -> create/return action ({}) -> dispatched -> middwares -> reducers
*/
export const authFacebook = (data) => {
    return async (dispatch) => {
        console.log("[ActionCreator] Facebook signUp called")
        console.log("we received from FB", data);
        const res = await axios.post('http://localhost:3000/users/auth/facebook',{access_token:data})
        console.log ('res ', res)

        console.log("[ActionCreator] Facebook_signUp dispatch an action!")
        dispatch({
            type:AUTH_SIGN_UP,
            payload: res.data.token
        })

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
        //axios.defaults.headers.common['Authorization'] =res.data.token
    }
}

export const authGoogle = (data) => {
    return async (dispatch) => {
        console.log("[ActionCreator] Google signUp called")
        console.log("we received from  GG", data);
        const res = await axios.post('http://localhost:3000/users/auth/google',{access_token:data})
        console.log ('res', res)

        console.log("[ActionCreator] Google_signUp dispatch an action!")
        dispatch({
            type:AUTH_SIGN_UP,
            payload: res.data.token
        })

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
        //axios.defaults.headers.common['Authorization'] =res.data.token
    }
}

export const signUp = (data) => {
    /*
        Step 1: Use data and to make HTTP request to BE and send it along
        Step 2: Take BE response (jwtToken is here now)
        Step 3: Dispatch user just signed up (with jwtToken)
        Step 4: Save the jwtToken into localStorage
    */
    return async (dispatch) => {
        try {
            console.log("[ActionCreator] signUp called")
            const res = await axios.post('http://localhost:3000/users/signup',data)
            console.log ('res', res)

            console.log("[ActionCreator] signUp dispatch an action!")
            dispatch({
                type:AUTH_REGISTER,
                payload: res.data.token
            })
            //Test- can remove
            console.log("res.data.token", res.data.token)

            localStorage.setItem('JWT_TOKEN', res.data.token);
        
            //Test- can remove
            const jwtToken123 = localStorage.getItem("JWT_TOKEN")
            console.log("jwtToken123",jwtToken123)
            const Bearer = `Bearer ${jwtToken123}`
            console.log("Bearer: ",Bearer)

            axios.defaults.headers.common['Authorization'] = Bearer;

        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "email is already in use"
            })
            console.error("Error of sign_up route: ", error);
        }
    }
}

export const signIn = (data) => {
    /*
        Step 1: Use data and to make HTTP request to BE and send it along
        Step 2: Take BE response (jwtToken is here now)
        Step 3: Dispatch user just signed up (with jwtToken)
        Step 4: Save the jwtToken into localStorage
    */
    return async (dispatch) => {
        try {
            console.log("[ActionCreator] signIn called")
            const res = await axios.post('http://localhost:3000/users/signin',data)
            console.log ('res', res)

            console.log("[ActionCreator] signIn dispatch an action!")
            dispatch({
                type:AUTH_SIGN_IN,
                payload: res.data.token
            })

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
            
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "Email and password combination isn't valid"
            })
            console.error("Error of sign_in route: ", error);
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        localStorage.removeItem("JWT_TOKEN")
        axios.defaults.headers.common['Authorization'] =""
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ""
        })
    }
}


export const getSecret = () => {
    return async (dispatch) => {
        try {
            console.log("[ActionCreator] Call to BE's secret")
            const res = await axios.get('http://localhost:3000/users/secret')
            console.log ('res of getSecret action', res)

            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret
            })
        } catch (error) {
            console.log('Err of secret route: ', error)
        }
    }
}