import { fromJS } from 'immutable';
import { LOGIN_SUCCESS } from '../Login/constants';

const initialState = fromJS({
    profile: null
});

function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return state
                .set('profile', fromJS(action.user));
        }
        default: {
            return state;
        }
    }
}

export default ProfileReducer;