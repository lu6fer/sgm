import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const selectUserDomain = () => (state) => state.get('user');

export const getToken = () => createSelector(
    selectUserDomain(),
    (userState) => userState.get('token')
);

export const getProfile = () => createSelector(
    selectUserDomain(),
    (userState) => !!userState.get('profile') ? userState.get('profile').toJS() : userState.get('profile')
);

export const getErrors = () => createSelector(
    selectUserDomain(),
    (userState) => userState.get('errors').toJS()
);

