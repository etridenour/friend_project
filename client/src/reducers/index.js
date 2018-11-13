import { combineReducers } from 'redux';
import friendReducer from './friendReducer';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import employeeReducer from './employeeReducer';


export default combineReducers({
    friends: friendReducer,
    employees: employeeReducer,
    auth: authReducer,
    form: formReducer
})