import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AuthChecker from './components/Login/authChecker';
import Sgm from './components/App';
import Login from './components/Login';
import Profile from './components/Profile';

export default (
    <Route path="/" component={Sgm}>
        <Route path="/login" component={Login} />
        <Route component={AuthChecker}>
            <Route path="/profile" component={Profile} />
        </Route>
    </Route>
);
