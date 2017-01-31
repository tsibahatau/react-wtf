import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import NotFoundPage from './components/pages/pageNotFound';

import HomePage from './components/pages/homePage';
import Register from './components/auth/register';
import Logout from './components/auth/Logout';
import Login from './components/auth/login';
import Blog from './components/protected/Blog';
import RequireAuth from './components/auth/requireAuth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={RequireAuth(Blog)} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="blog" component={RequireAuth(Blog)} />
        <Route path="logout" component={Logout} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);