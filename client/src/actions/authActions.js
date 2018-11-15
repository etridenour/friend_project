import axios from 'axios';
import { AUTH_ERROR, AUTH_USER, AUTH_MESSAGE, AUTH_MESSAGE_DEL, FIND_FRIENDS, SIGN_OUT } from './types';

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
        dispatch({ type: AUTH_USER, payload: response.data.user })
        dispatch({ type: FIND_FRIENDS, payload: response.data.friends })
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('friend_email', response.data.user.email);

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
            var user = response.data.user
            var friends = response.data.friends
            user.token = token
            
            dispatch({ type: AUTH_USER, payload: user})
            dispatch({ type: FIND_FRIENDS, payload: friends  })
        })
        
    
        callback();
        }
    

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }

}


export const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('friend_email');
    return {
        type: SIGN_OUT
    };
};

export const clearMessages = () => ({
    type: AUTH_MESSAGE_DEL
})


