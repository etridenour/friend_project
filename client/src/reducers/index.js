import { combineReducers } from 'redux';
import friendReducer from './friendReducer';
import authReducer from './authReducer';


export default combineReducers({
    friends: friendReducer,
})