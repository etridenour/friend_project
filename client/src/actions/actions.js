import { FIND_FRIENDS } from './types'



export const findFriends = () => async dispatch => {

    const response = await axios.get(
        '/findFriends'
    );
    dispatch ({ type: FIND_FRIENDS, payload: response})
}