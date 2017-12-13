import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from './components/Login/reducer';

const rootReducer = combineReducers({
    form: formReducer,  // ← redux-form
    routing: routerReducer,
    user: LoginReducer
});

export default rootReducer;