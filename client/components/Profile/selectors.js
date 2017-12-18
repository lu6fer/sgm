import {createSelector} from 'reselect';

export const selectUserDomain = () => (state) => state.get('user');

export const getProfile = () => createSelector(
    selectUserDomain(),
    (userState) => !!userState.get('profile') ? userState.get('profile').toJS() : userState.get('profile')
);