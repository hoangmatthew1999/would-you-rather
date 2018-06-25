import { formatUserData } from "../utils/tools";
import { auth } from "../utils/firebase";

export const AUTH_USER = "AUTH_USER";
export const AUTH_USER_ERROR = "AUTH_USER_ERROR";
export const UNAUTH_USER = "UNAUTH_USER";

export function handleAuthedUser(user) {
  return dispatch => {
    const userData = formatUserData(user);
    dispatch(authUser(userData));
  };
}

export function handleUnAuthUser() {
  return dispatch => {
    dispatch(unAuthUser());
    auth().signOut();
  };
}

export function handleAuthUser({ email, password }) {
  return dispatch => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => dispatch(handleAuthedUser(user)))
      .catch(error => dispatch(authUserError(error.message)));
  };
}

export function authUserError(error) {
  return {
    type: AUTH_USER_ERROR,
    error
  };
}

function authUser(user) {
  return {
    type: AUTH_USER,
    user
  };
}

function unAuthUser() {
  return {
    type: UNAUTH_USER
  };
}
