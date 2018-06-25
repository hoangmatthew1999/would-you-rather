import { usersRef } from "../utils/firebase";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_ALL_USERS_FAIL = "FETCH_ALL_USERS_FAIL";
export function fetchAndHandleAllUsers() {
  return dispatch => {
    dispatch(fetchAllUsers());
    usersRef
      .get()
      .then(querySnapshot => {
        const users = querySnapshot.docs.map(doc => doc.data());
        dispatch(fetchAllUsersSuccess(users));
      })
      .catch(error => dispatch(fetchAllUsersFail(error)));
  };
}

function fetchAllUsersSuccess(users) {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    users
  };
}

function fetchAllUsers() {
  return {
    type: FETCH_ALL_USERS
  };
}

function fetchAllUsersFail(error) {
  return {
    type: FETCH_ALL_USERS_FAIL,
    error
  };
}
