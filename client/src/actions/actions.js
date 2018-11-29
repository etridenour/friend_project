import { FIND_FRIENDS, AUTH_ERROR, CHANGE_PROFILE, FIND_EMPLOYEES, CHANGE_PRIVILEGE, UPDATE_COUNT } from './types';
import axios from 'axios';
import {clearMessages} from './authActions'

var baseUrl = ''
//var baseUrl = 'http://localhost:5000'

export {clearMessages}

export const findFriends = (id) => async dispatch => {

    const response = await axios.post(
        baseUrl + '/findFriends',
        {uid: id}
    );
    dispatch ({ type: FIND_FRIENDS, payload: response.data})
}




export const newFriend = (friendshipData) => async dispatch => {

    try{
        const response = await axios.post(
            baseUrl + '/newFriend',
            {friendshipData: friendshipData}
        );
    
        if(response.data.friends){
            var friends = response.data.friends
            var friendCount = response.data.friendCount
            
            dispatch({type: UPDATE_COUNT, payload: friendCount})
            dispatch({type: FIND_FRIENDS, payload: friends})
        

        }

    } catch (e) {
        dispatch ({ type: AUTH_ERROR, payload: 'Incorrect pin'})
    }
}

export const changeProfile = (data) => async dispatch => {
    try{
        const response = await axios.post(
            baseUrl + '/changeProfile',
            {data: data}
        );
        dispatch({ type: CHANGE_PROFILE, payload: data})

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Error'})
    }
};

export const alreadyFriends = (firstName, lastName) => ({
    type: AUTH_ERROR,
    payload: `You are already friends with ${firstName} ${lastName}`
}) 

export const thisIsMe = () => ({
    type: AUTH_ERROR,
    payload: `Nice try.`
}) 


export const findEmployees = () => async dispatch => {

    const response = await axios.get(
        baseUrl + '/employees'
    );
    dispatch({ type: FIND_EMPLOYEES, payload: response.data.employees });

} 

export const privilegeChange = (privilege, id) => async dispatch => {

    const response = await axios.post(
        baseUrl + '/privilegeChange',{
            id: id,
            privilege: privilege
        }
    )
    .then((response) => {
        dispatch({ type: FIND_EMPLOYEES, payload: response.data.employees })
        dispatch({ type: CHANGE_PRIVILEGE, payload: privilege})
    })
}


export const deleteEmployee = (id, adminId) => async dispatch => {


const response = await axios.post(

    baseUrl + '/deleteEmployee',{
        id: id,
        adminId: adminId
    })
        dispatch({ type: FIND_EMPLOYEES, payload: response.data.employees })
        dispatch({ type: FIND_FRIENDS, payload: response.data.friends })
}




