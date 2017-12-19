import Api from '../../utils/api';
import { PROFILE_UPDATE_FAILED, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from './constants';

export function profileUpdate(data) {
    return (dispatch) => {
        dispatch({
            type: PROFILE_UPDATE_REQUEST
        });

        Api.put(`/users/${data.slug}`, data)
            .then((res) => {
                dispatch({
                    type: PROFILE_UPDATE_SUCCESS,
                    user: res.user
                });
            })
            .catch((err) => {
                dispatch({
                    type: PROFILE_UPDATE_FAILED,
                    message: err.message
                });
            });
    };
}