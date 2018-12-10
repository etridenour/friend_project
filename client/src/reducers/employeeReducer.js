import { FIND_EMPLOYEES } from '../actions/types';

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action){

    switch(action.type){


        case FIND_EMPLOYEES:
            console.log(action.payload)
            return action.payload
            
            
        default:
            return state;
    }
}