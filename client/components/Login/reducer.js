import {fromJS, List} from 'immutable';
import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, SET_REDIRECT_URL, NAVIGATE_TO } from './constants';

const initialState = fromJS({
    isAuthenticating: false,
    errors: [],
    token: null,
    redirectUrl: null
});

function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return state
                .set('isAuthenticating', true)
                .set('errors', List([]));
        }
        case LOGIN_FAILED: {
            return state
                .set('isAuthenticating', false)
                .update('errors', (errors) => (
                    errors.concat(action.message)
                ));
        }
        case LOGIN_SUCCESS: {
            return state
                .set('isAuthenticating', false)
                .set('errors', List([]))
                .set('token', fromJS(action.token));
        }
        case SET_REDIRECT_URL: {
            return state
                .set('redirectUrl', action.url);
        }
        case NAVIGATE_TO: {
            return state
                .delete('redirectUrl');
        }
        default: {
            return state;
        }
    }
}

export default LoginReducer;

