import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import NotFoundPage from './components/pages/pageNotFound';

import HomePage from './components/pages/homePage';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/requireAuth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="dashboard" component={RequireAuth(Dashboard)} />

        <Route path="*" component={NotFoundPage} />
    </Route>
);