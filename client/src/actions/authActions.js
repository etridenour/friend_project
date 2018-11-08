import { AUTH_ERROR, AUTH_USER } from './types';

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