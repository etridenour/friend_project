import { AUTH_USER, AUTH_ERROR, AUTH_MESSAGE, AUTH_MESSAGE_DEL, CHANGE_PIN  } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: null,
    privilege: ''
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case AUTH_USER:
            return{...state,
                authenticated: action.payload.token,
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                secretpin: action.payload.secretpin,
                privilege: action.payload.privilege,
                signUpMessage: ''
            };

        case AUTH_MESSAGE:
            return {...state,
                signUpMessage: action.payload,
                errorMessage: ''
            };

        case AUTH_ERROR:
            return{...state,
                errorMessage: action.payload
            };

        case AUTH_MESSAGE_DEL:
            return {...state,
            signUpMessage: '',
            errorMessage: ''
            };

        case CHANGE_PIN:
            return {...state,
            secretpin: action.payload
            };

        default:
            return state;

    }

}