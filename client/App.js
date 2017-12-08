/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { LocaleProvider } from 'antd';
import frFR from 'antd/lib/locale-provider/fr_FR';

// Import Routes
import routes from './routes';


export default function App(props) {
  return (
    <Provider store={props.store}>
        <LocaleProvider locale={frFR}>
            <Router history={browserHistory}>
              {routes}
            </Router>
        </LocaleProvider>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
