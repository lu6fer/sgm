import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const selectAuthDomain = () => (state) => state.get('auth');

export const getToken = () => createSelector(
    selectAuthDomain(),
    (authState) => !!authState.get('token') ? authState.get('token').toJS() : authState.get('token')
);

export const getErrors = () => createSelector(
    selectAuthDomain(),
    (authState) => authState.get('errors').toJS()
);

export const getRedirectUrl = () => createSelector(
    selectAuthDomain(),
    (authState) => authState.get('redirectUrl')
);