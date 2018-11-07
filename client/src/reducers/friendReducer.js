import { FIND_FRIENDS } from '../actions/types';

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action){

    switch(action.type){

        case FIND_FRIENDS:

            return action.payload.friends
            
        default:
            return state;
    }
}