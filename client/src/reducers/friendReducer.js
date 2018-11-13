import { FIND_FRIENDS, FIND_EMPLOYEES } from '../actions/types';

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action){

    switch(action.type){

        case FIND_FRIENDS:
            return action.payload
            
        default:
            return state;
    }
}