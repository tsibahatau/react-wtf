import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  BLOG_ACCESS,
  BLOG_ADD} from './types';
export const API_URL = 'https://afternoon-thicket-27602.herokuapp.com/api';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser()(dispatch);
  }
  dispatch({
    type: type,
    payload: errorMessage
  });

}

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/blog');
      })
      .catch((error) => {
        console.log('error' + error);
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/blog');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    console.log("Logout");
    browserHistory.push('/login');
  }
}

export function getBlogPosts() {
  return function(dispatch) {
    axios.get(`${API_URL}/posts`, {
      headers: { 'Authorization': cookie.load('token') }
    })
      .then(response => {
        dispatch({
          type: BLOG_ACCESS,
          payload: response.data.content
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function createPost(postData) {
  return function(dispatch) {
    axios.post(`${API_URL}/posts`,{
      title: postData.title,
      text: postData.text
    },{
      headers: { 'Authorization': cookie.load('token') }
    })
      .then(response => {
        dispatch({
          type: BLOG_ADD,
          payload: response.data.content
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}