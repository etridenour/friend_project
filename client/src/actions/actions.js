import { FIND_FRIENDS, AUTH_ERROR, CHANGE_PROFILE } from './types';
import axios from 'axios';

var baseUrl = ''
//var baseUrl = 'http://localhost:5000'



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



