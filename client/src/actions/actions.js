import { FIND_FRIENDS } from './types';
import axios from 'axios';



export const findFriends = (id) => async dispatch => {

    const response = await axios.post(
        '/findFriends',
        {uid: id}
    );
    dispatch ({ type: FIND_FRIENDS, payload: response.data})
}



