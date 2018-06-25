import { questionsRef, usersRef } from "../utils/firebase";
export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
export const FETCH_QUESTIONS_FAIL = "FETCH_QUESTIONS_FAIL";

export function fetchAndHandleQuestions(uid) {
  return (dispatch, getState) => {
    dispatch(fetchQuestions());
    const answeredPromise = usersRef
      .doc(uid)
      .get()
      .then(snapshot => {
        const { answers } = snapshot.data();
        const promises = Object.entries(answers).map(([qid, option]) =>
          questionsRef
            .doc(qid)
            .get()
            .then(snapshot => ({
              ...snapshot.data(),
              answer: option
            }))
        );
        return Promise.all(promises);
      });

    const unAnsweredPromise = usersRef
      .doc(uid)
      .get()
      .then(snapshot => {
        const { answers } = snapshot.data();
        const answeredQID = Object.keys(
          typeof answers === "undefined" ? [] : answers
        );
        const p = questionsRef.get().then(querySnapshot => {
          const allDocs = querySnapshot.docs.map(doc => doc.data());
          const unanswered = allDocs.filter(
            ({ qid }) => !answeredQID.includes(qid)
          );
          return unanswered;
        });
        return p;
      });

    Promise.all([answeredPromise, unAnsweredPromise])
      .then(([answeredQuestions, unansweredQuestions]) => {
        dispatch(
          fetchQuestionsSuccess({
            answered: answeredQuestions,
            unanswered: unansweredQuestions
          })
        );
      })
      .catch(error =>
        dispatch(
          fetchQuestionsFail(
            "Error: error fetching unanswered and answered questions."
          )
        )
      );
  };
}

export function handleUpdateQuestion(qid, choice, votes) {
  return (dispatch, getState) => {
    const { users } = getState();
    const { uid } = users;
    questionsRef.doc(qid).update({
      [`${choice}.votes`]: [...votes, uid]
    });
    usersRef.doc(uid).update({
      [`answers.${qid}`]: choice
    });
  };
}

function fetchQuestions() {
  return {
    type: FETCH_QUESTIONS
  };
}

function fetchQuestionsSuccess(splitQuestions) {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    splitQuestions
  };
}

function fetchQuestionsFail(error) {
  return {
    type: FETCH_QUESTIONS_FAIL,
    error
  };
}
