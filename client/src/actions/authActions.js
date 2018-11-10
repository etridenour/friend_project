import axios from 'axios';
import { AUTH_ERROR, AUTH_USER, AUTH_MESSAGE, AUTH_MESSAGE_DEL, CHANGE_PIN } from './types';

var baseUrl = ''
//var baseUrl = 'http://localhost:5000'


export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            baseUrl + '/signup',
            formProps
        );
        dispatch({ type: AUTH_MESSAGE, payload: 'User created. Please sign in.'})

        callback();

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};


export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            baseUrl + '/signin',
            formProps
        );
        dispatch({ type: AUTH_USER, payload: response.data })
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('friend_email', response.data.email);

        callback();

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};



export const autoSignin = (callback) => async dispatch => {
    try {


        var email = localStorage.getItem('friend_email')
        var token = localStorage.getItem('token')

        if(token && email){
        const response = await axios.post(
            baseUrl + '/authenticate',
            {email: email},
            {headers: {Authorization: token}}
        ).then((response)=>{
            var user = response.data
            user.token = token
            dispatch({ type: AUTH_USER, payload: user })
        })
        
    
        callback();
        }
    

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }

}


export const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('friend_username');
    return {
        type: AUTH_USER,
        payload: {
            userName: ''
        }
    };
};

export const signout1 = () => {

    return {
        type: AUTH_MESSAGE_DEL,
        payload: {
            signUpMessage: '',
            errorMessage: ''
        }
    };
};


export const changePin = (pin) => async dispatch => {
    try{
        const response = await axios.post(
            baseUrl + '/changePin',
            {secretpin: pin}
        );
        dispatch({ type: CHANGE_PIN, payload: pin})

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Error'})
    }
};
