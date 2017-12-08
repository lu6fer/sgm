/*
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';

// middlewares
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import logger from 'redux-logger'

// Import custom components
import rootReducer from './reducers';

const middlewares = [
    routerMiddleware(browserHistory),
    thunkMiddleware,
    logger
];

const enhancers = [
    applyMiddleware(...middlewares),
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/!* eslint-disable no-underscore-dangle *!/
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

/!**
 * Create a Redux store that holds the app state.
 *!/
const store = createStore(
    rootReducer,
    fromJS({}),
    composeEnhancers(...enhancers)
);

export default store;*/

import { createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'
import { fromJS } from 'immutable';

import rootReducer from './reducers';

export function configureStore(initialState) {
    const middlewares = [
        routerMiddleware(browserHistory),
        thunkMiddleware,
        logger
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    const store = createStore(
        rootReducer,
        fromJS(initialState),
        composeEnhancers(...enhancers)
    );

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
