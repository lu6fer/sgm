import { fromJS } from 'immutable';
import { LOGIN_SUCCESS } from '../Login/constants';
import { PROFILE_UPDATE_FAILED, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_REQUEST } from './constants';

const initialState = fromJS({
    profile: null,
    errors: []
});

function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return state
                .set('profile', fromJS(action.user));
        }
        case PROFILE_UPDATE_REQUEST: {
            return state;
        }
        case PROFILE_UPDATE_SUCCESS: {
            return state;
        }
        case PROFILE_UPDATE_FAILED: {
            return state;
        }
        default: {
            return state;
        }
    }
}

export default ProfileReducer;