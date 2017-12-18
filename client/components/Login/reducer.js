import {fromJS, List} from 'immutable';
import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS } from './constants';

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
                .set('token', action.token);
        }
        default: {
            return state;
        }
    }
}

export default LoginReducer;

