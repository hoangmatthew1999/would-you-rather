const users = [
  {
    uid: "541570",
    name: "Scott Iwako",
    username: "iwakoscott",
    avatarURL:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-6c8cc.appspot.com/o/profile%2Fprofile.jpg?alt=media&token=58ef0019-57b8-4eb3-a450-e154a01eb8c0",
    answers: {
      "0": "optionTwo",
      "1": "optionOne"
    },
    questions: ["0"]
  },
  {
    uid: "432839",
    name: "Darya Chumakova",
    username: "darya94",
    avatarURL:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-6c8cc.appspot.com/o/profile%2Fdarya.jpg?alt=media&token=d77d8598-9758-44ad-ab49-7b7bce21f788",
    answers: {
      "0": "optionOne",
      "1": "optionOne"
    },
    questions: ["1"]
  }
];
const questions = [
  {
    qid: "0",
    uid: "541570",
    timeStamp: 1529357439114,
    optionOne: {
      text: "Live in a place where it is always hot",
      votes: ["432839"]
    },
    optionTwo: {
      text: "always cold",
      votes: ["541570"]
    }
  },
  {
    qid: "1",
    uid: "432839",
    timeStamp: 1529357589267,
    optionOne: {
      text: "never be able to eat warm food",
      votes: ["541570", "432839"]
    },
    optionTwo: {
      text: "never be able to eat cold food",
      votes: []
    }
  }
];

export function getUser(uid) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(users.find(user => user.uid === uid));
    }, 300)
  );
}

export function getQuestions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(questions);
    }, 400);
  });
}
