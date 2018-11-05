import { combineReducers } from 'redux';
import reducers from './reducers';
import authReducer from './authReducer';


export default combineReducers({
    reducers,
    authReducer
})