import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Sgm from './components/App';
import Login from './components/Login';

export default (
    <Route path="/" component={Sgm}>
        <Route path="/login" component={Login} />
    </Route>
);
