import { AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  BLOG_ACCESS,
  BLOG_ADD} from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case BLOG_ACCESS:
      return { ...state, content: action.payload };
    case  BLOG_ADD:
      return {...state, content: state.content.concat(action.payload)};
  }

  return state;
}