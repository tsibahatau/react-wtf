import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import routes from './routes';
import reducers from './reducers/rootReducer';
import { AUTH_USER } from './actions/types';
import cookie from 'react-cookie';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

cookie.load('token') &&  store.dispatch({ type: AUTH_USER });
ReactDOM.render(
<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.querySelector('.react-container'));