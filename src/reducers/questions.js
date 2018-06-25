import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAIL
} from "../actions/questions";

const initialState = {
  isFetching: false,
  splitQuestions: {
    answered: [],
    unanswered: []
  },
  error: null
};

export default function questions(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        splitQuestions: action.splitQuestions
      };
    case FETCH_QUESTIONS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
