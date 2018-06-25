import { AUTH_USER, AUTH_USER_ERROR, UNAUTH_USER } from "../actions/users";

const initialState = {
  avatarURL: "",
  uid: "",
  timestamp: 0,
  isAuthed: false,
  error: null,
  isFetching: true,
  username: ""
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        isFetching: false,
        isAuthed: true,
        error: null,
        ...action.user
      };
    case AUTH_USER_ERROR:
      return {
        isFetching: false,
        isAuthed: false,
        error: action.error
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false
      };
    default:
      return state;
  }
} // users reducer
