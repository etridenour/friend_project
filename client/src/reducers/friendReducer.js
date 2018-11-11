import { FIND_FRIENDS, CHANGE_PROFILE } from '../actions/types';

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action){

    switch(action.type){

        case FIND_FRIENDS:
            return action.payload

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