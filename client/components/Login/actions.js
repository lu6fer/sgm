// import { replace } from 'react-router-redux';
import {LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, SET_REDIRECT_URL, NAVIGATE_TO} from './constants';
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
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: LOGIN_FAILED,
                    message: err.data.message
                });
            });
    };
}

export function setRedirectUrl(url) {
    return {
        type: SET_REDIRECT_URL,
        url
    };
}

export function navigateTo(url) {
    return {
        type: NAVIGATE_TO,
        url
    };
}
