import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAIL
} from "../actions/rankings";

const intialState = {
  isFetching: false,
  users: [],
  error: null
};

export default function rankings(state = intialState, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.users
      };
    case FETCH_ALL_USERS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
