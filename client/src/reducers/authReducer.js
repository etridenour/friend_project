import { AUTH_USER, AUTH_ERROR, AUTH_MESSAGE, AUTH_MESSAGE_DEL, SIGN_OUT, CHANGE_PROFILE, UPDATE_COUNT, PASS_MESSAGE_DEL, USER_CREATED_AUTH_MESSAGE_DEL } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '',
    privilege: '',
    friendSuccess: null
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case AUTH_USER:
            const {token, id, lastName, firstName, email, secretpin, privilege, friendCount, jobDescription, title} = action.payload
            return{...state,
                authenticated: token,
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                secretpin: secretpin,
                privilege: privilege,
                friendCount: friendCount,
                jobDescription: jobDescription,
                title: title,
                signUpMessage: '',
                errorMessage: '',
                friendSuccess: null
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
                errorMessage: '',
                friendSuccess: null
            };
            
        case USER_CREATED_AUTH_MESSAGE_DEL:
            return {...state,
                errorMessage: '',
                }
        
        case PASS_MESSAGE_DEL:
            return {...state,
                signUpMessage: ''    
            }

        case SIGN_OUT:
            return {...state,
                signUpMessage: '',
                errorMessage: '',
                email: '',
                authenticated: '',
                id: '',
                friendCount:'',
                firstName: '',
                lastName: '',
                secretpin: '',
                privilege: '',
            };

        case CHANGE_PROFILE:
            return {...state,
                secretpin: action.payload.secretpin,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                title: action.payload.title,
                jobDescription: action.payload.jobDescription
            };

        case UPDATE_COUNT:
            return {...state,
                friendCount: action.payload,
                friendSuccess: true
            }

        default:
            return state;

    }

}