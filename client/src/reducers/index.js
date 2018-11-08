import { combineReducers } from 'redux';
import friendReducer from './friendReducer';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
    friends: friendReducer,
    auth: authReducer,
    form: formReducer
})