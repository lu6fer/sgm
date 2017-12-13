/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import {Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { LocaleProvider } from 'antd';
import frFR from 'antd/lib/locale-provider/fr_FR';

// Import Style before anything else
import './main.less';

// Import Routes
import routes from './routes';


export default function App(props) {
  return (
    <Provider store={props.store}>
        <LocaleProvider locale={frFR}>
            <Router history={syncHistoryWithStore(hashHistory, props.store)}>
              {routes}
            </Router>
        </LocaleProvider>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
