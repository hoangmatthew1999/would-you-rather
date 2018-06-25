export function calculate(optionOne, optionTwo) {
  const { votes: votesOne } = optionOne;
  const { votes: votesTwo } = optionTwo;

  const votesOneLength = typeof votesOne === "undefined" ? 0 : votesOne.length;
  const votesTwoLength = typeof votesTwo === "undefined" ? 0 : votesTwo.length;
  const total = votesOneLength + votesTwoLength;

  const left = 100 * votesOneLength / total;
  const right = 100 * votesTwoLength / total;
  return {
    left: Math.round(left * 100) / 100,
    right: Math.round(right * 100) / 100
  };
} // calculate

export function formatUserData(props) {
  const { uid, providerData, displayName: username } = props;
  const { photoURL: avatarURL } = providerData[0];
  return {
    uid,
    avatarURL,
    timestamp: Date.now(),
    username
  };
} // formatUserData

export function splitQuestions(questions, uid) {
  return questions.reduce((acc, { optionOne, optionTwo, qid }) => {
    const { votes: optionOneVotes } = optionOne;
    const { votes: optionTwoVotes } = optionTwo;
    const prevState = acc["answered"];
    const hasAnswered =
      (typeof optionOneVotes !== "undefined" && optionOneVotes.includes(uid)) ||
      (typeof optionTwoVotes !== "undefined" && optionTwoVotes.includes(uid));

    if (hasAnswered) {
      acc["answered"] =
        typeof prevState === "undefined" ? [qid] : [...prevState, qid];
    } else {
      acc["unanswered"] =
        typeof prevState === "undefined" ? [qid] : [...prevState, qid];
    }
    return acc;
  }, {});
}
