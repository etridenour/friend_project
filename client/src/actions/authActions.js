import { AUTH_ERROR, AUTH_USER, AUTH_MESSAGE } from './types';

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
            baseUrl + '/signup',
            formProps
        );
        dispatch({ type: AUTH_USER, payload: response.data.token })
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.firstName);

        callback();

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};



export const autoSignin = (callback) => async dispatch => {
    try {


        var userName = localStorage.getItem('beer_username')
        var token = localStorage.getItem('token')

        if(token && userName){
        const response = await axios.post(
            baseUrl + '/authenticate',
            {userName: userName},
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
    localStorage.removeItem('beer_username');
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