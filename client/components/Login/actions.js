import { replace } from 'react-router-redux';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from './constants';
import Api from '../../utils/api';

export function login(credentials) {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        Api.post('/login', credentials)
            .then((res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: res.data.user,
                    token: res.data.token
                });
                dispatch(replace('/dashboard'));
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_FAILURE,
                    message: err.data.message
                });
            });
    };
}
