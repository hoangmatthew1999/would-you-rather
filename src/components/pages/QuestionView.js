import React, { Component } from "react";
import { getQuestions, getUser } from "../../utils/fakeAPI";
import Header from "../Header";
import styled, { css } from "styled-components";
import { CardStripAvatar } from "../Card";
import { calculate } from "../../utils/tools";
import { connect } from "react-redux";
import Loading from "../Loading";

import {
  MainWrapper,
  BodyWrapper,
  FooterWrapper
} from "../SharedStyledComponents";

import {
  fetchAndHandleQuestions,
  handleUpdateQuestion
} from "../../actions/questions";

const QuestionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  height: 100%;
`;

const QuestionFooterWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 50px;
`;

const QuestionPercent = styled.div`
  grid-column: 3 / -1;
  display: grid;
  justify-self: end;
  padding: 10px;
`;

const MyAvatar = styled.div`
  grid-column: 1 / span 1;
  padding: 10px;
`;

const QuestionHeaderWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
`;

const QuestionWrapper = styled.div`
  ${({ left }) =>
    left
      ? css`
          background: #fd7272;
          opacity: 0.8;
        `
      : css`
          background: #25ccf7;
          opacity: 0.8;
        `};
  display: grid;
  height: 100%;
  ${({ answered }) =>
    !answered
      ? css`
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        `
      : css`
          cursor: not-allowed;
          opacity: 1;
        `} grid-template-rows: 1fr min-content;
`;

const QuestionText = styled.h2`
  display: grid;
  transition: all 300ms;
  text-align: center;
  justify-self: center;
  align-self: center;
  display: grid;
`;

class QuestionView extends Component {
  state = {
    isFetching: true,
    question: {}
  };

  componentDidMount() {
    const { dispatch, uid } = this.props;
    dispatch(fetchAndHandleQuestions(uid));
  }

  componentDidUpdate(prevProps) {
    const { qid } = this.props.match.params;
    const question = this.props.questions.find(q => q.qid === qid);
    if (prevProps.isFetching !== this.props.isFetching) {
      if (typeof question !== "undefined") {
        this.setState({ question, isFetching: false });
      }
    }
  }

  handleOnClick = choice => {
    const votes = this.state.question[choice].votes || [];
    this.setState({
      question: {
        ...this.state.question,
        answer: choice,
        [choice]: {
          ...this.state.question[choice],
          votes: [...votes, this.props.uid]
        }
      }
    });
    const { qid } = this.props.match.params;
    this.props.dispatch(handleUpdateQuestion(qid, choice, votes));
  };

  render() {
    if (this.state.isFetching) {
      return <Loading />;
    } else {
      const { meta, ...question } = this.state.question;
      const { avatarURL: OPAvatarURL, username } = meta;
      const { optionOne, optionTwo } = question;
      const { left, right } = calculate(optionOne, optionTwo);
      const { authedUserAvatarURL } = this.props;
      const hasAnswered =
        question.answer === "optionOne" || question.answer === "optionTwo";
      return (
        <MainWrapper>
          <Header>
            <QuestionHeaderWrapper>
              <CardStripAvatar src={OPAvatarURL} width={150} height={150} />
              <h3>
                {username} asks,<br />would you rather...
              </h3>
            </QuestionHeaderWrapper>
          </Header>
          <BodyWrapper>
            <QuestionsWrapper>
              <QuestionWrapper
                left
                onClick={
                  hasAnswered ? () => {} : () => this.handleOnClick("optionOne")
                }
                answered={hasAnswered}
              >
                <QuestionText>{question.optionOne.text}</QuestionText>
                <QuestionFooterWrapper>
                  <MyAvatar>
                    {question.answer === "optionOne" ? (
                      <CardStripAvatar
                        src={authedUserAvatarURL}
                        width={25}
                        height={25}
                      />
                    ) : null}
                  </MyAvatar>
                  <QuestionPercent>{left}%</QuestionPercent>
                </QuestionFooterWrapper>
              </QuestionWrapper>
              <QuestionWrapper
                onClick={
                  hasAnswered ? () => {} : () => this.handleOnClick("optionTwo")
                }
                answered={hasAnswered}
              >
                <QuestionText>{question.optionTwo.text}</QuestionText>
                <QuestionFooterWrapper>
                  <MyAvatar>
                    {question.answer === "optionTwo" ? (
                      <CardStripAvatar
                        src={authedUserAvatarURL}
                        width={25}
                        height={25}
                      />
                    ) : null}
                  </MyAvatar>
                  <QuestionPercent>{right}%</QuestionPercent>
                </QuestionFooterWrapper>
              </QuestionWrapper>
            </QuestionsWrapper>
          </BodyWrapper>
        </MainWrapper>
      );
    }
  }
}

function mapStateToProps({ questions, users }) {
  const { answered, unanswered } = questions.splitQuestions;
  const { avatarURL: authedUserAvatarURL, uid } = users;
  return {
    questions: [...answered, ...unanswered],
    authedUserAvatarURL,
    uid,
    isFetching: questions.isFetching
  };
}

export default connect(mapStateToProps)(QuestionView);
