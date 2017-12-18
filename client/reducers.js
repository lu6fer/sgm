import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from './components/Login/reducer';
import ProfileReducer from './components/Profile/reducer';

const rootReducer = combineReducers({
    form: formReducer,  // ← redux-form
    routing: routerReducer,
    auth: LoginReducer,
    user: ProfileReducer
});

export default rootReducer;
