import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case AUTH_USER:
            return{...state,
                authenticated: action.payload.token,
                userName: action.payload.userName,
                companyName: action.payload.companyName,
                privilege: action.payload.privilege,
                id: action.payload.id,
                signUpMessage: ''
            };

        case AUTH_ERROR:
            return{...state,
                errorMessage: action.payload
            };

        default:
            return state;

    }

}