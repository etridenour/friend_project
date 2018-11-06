import { FIND_FRIENDS } from './types';
import axios from 'axios';



export const findFriends = () => async dispatch => {

    const response = await axios.get(
        '/findFriends'
    );
    // console.log(response.data)
    dispatch ({ type: FIND_FRIENDS, payload: response.data})
}