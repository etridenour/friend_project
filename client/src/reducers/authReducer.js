import { AUTH_USER, AUTH_ERROR, AUTH_MESSAGE, AUTH_MESSAGE_DEL, SIGN_OUT, CHANGE_PROFILE } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '',
    privilege: ''
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case AUTH_USER:
            const {token, id, lastName, firstName, email, secretpin, privilege} = action.payload
            return{...state,
                authenticated: token,
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                secretpin: secretpin,
                privilege: privilege,
                signUpMessage: '',
                errorMessage: ''
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


        case SIGN_OUT:
            return {...state,
                signUpMessage: '',
                errorMessage: '',
                email: '',
                authenticated: '',
                id: '',
                firstName: '',
                lastName: '',
                secretpin: '',
                privilege: '',
            };

        case CHANGE_PROFILE:
            return {...state,
                secretpin: action.payload.pin,
                firstName: action.payload.newFirstName,
                lastName: action.payload.newLastName
            };

        default:
            return state;

    }

}