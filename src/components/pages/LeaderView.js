import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { fetchAndHandleAllUsers } from "../../actions/rankings";
import { MainWrapper } from "../SharedStyledComponents";
import {
  CardWrapper,
  CardStripContentWrapper,
  VerticalBar,
  CardStripAvatar
} from "../Card";
import Loading from "../Loading";
import styled from "styled-components";

const BodyWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const CardStripBodyWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

function LeaderCard({ uid, username, avatarURL, answers, questions }) {
  return (
    <CardWrapper padding="10px">
      <CardStripContentWrapper>
        <VerticalBar>
          <CardStripAvatar
            width="100px"
            height="100px"
            alt="profile"
            src={avatarURL}
          />
        </VerticalBar>
        <CardStripBodyWrapper>
          <h2>{username}</h2>
          <div style={{ marginLeft: "5px" }}>
            <h4>Asked: {questions}</h4>
            <h4>Answered: {answers}</h4>
          </div>
        </CardStripBodyWrapper>
      </CardStripContentWrapper>
    </CardWrapper>
  );
}

class LeaderView extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAndHandleAllUsers());
  }

  render() {
    const { isFetching, users } = this.props.rankings;
    const _users = users.sort(
      (a, b) => b.answers + b.questions - (a.answers + a.questions)
    );
    return (
      <MainWrapper>
        <Header>Leaderboard</Header>
        <BodyWrapper>
          <div>
            {isFetching ? (
              <Loading />
            ) : (
              _users.map(user => <LeaderCard key={user.uid} {...user} />)
            )}
          </div>
        </BodyWrapper>
        <div />
      </MainWrapper>
    );
  } // render
} // LeaderView

function mapStateToProps({ rankings }) {
  const { users, isFetching, error } = rankings;
  const _users = users.map(
    ({ avatarURL, answers, questions, username, uid }) => {
      return {
        uid,
        avatarURL,
        username,
        answers: Object.keys(answers).length,
        questions: typeof questions !== "undefined" ? questions.length : 0
      };
    }
  );
  return {
    rankings: {
      error,
      isFetching,
      users: _users
    }
  };
}

export default connect(mapStateToProps)(LeaderView);
