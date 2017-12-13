import { createSelector } from 'reselect';

export const selectUserDomain = () => (state) => state.get('user');

export const getToken = () => createSelector(
    selectUserDomain(),
    (userState) => userState.get('token')
);

export const getProfile = () => createSelector(
    selectUserDomain(),
    (userState) => userState.get('profile').toJS()
);

export const getErrors = () => createSelector(
    selectUserDomain(),
    (userState) => userState.get('errors').toJS()
);

