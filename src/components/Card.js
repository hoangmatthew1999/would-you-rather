import React, { Component } from "react";
import Bar from "./Bar";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { calculate } from "../utils/tools";

const shake = keyframes`
  0% {
    transform: translateY(-4px) rotate(0deg);
  }

  25% {
    transform: rotate(-1deg);
  }

  50% {
    transform: rotate(1deg);
  }

  100% {
    transform: rotate(0deg);
    -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
  }
`;

const CardWrapper = styled.div`
  background: white;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  border-style: solid;
  border-width: thin;
  border-color: #ced6e0;
  padding: 20px 25px;
  -moz-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 100ms;

  &:hover {
    animation: ${shake} 300ms ease-out;
  }
`;

export const CardStripAvatar = styled.img`
  justify-self: ${({ position }) => (position ? position : "center")};
  align-self: center;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export const VerticalBar = styled.div`
  display: grid;
  height: 100%;
  border-right-width: thin;
  border-right-style: solid;
  border-right-color: #95a5a6;
  -webkit-border-right-width: thin;
  -webkit-border-right-style: solid;
  -webkit-border-right-color: #95a5a6;
  -moz-right-width: thin;
  -moz-border-right-style: solid;
  -moz-border-right-color: #95a5a6;
  padding-right: 20px;
`;

export const CardStripContentWrapper = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: min-content 1fr;
`;

export const CardStripBodyWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-row-gap: 10px;
`;

export const QuestionWrapper = styled.div`
  justify-self: center;
`;

class Card extends Component {
  componentDidMount() {}

  render() {
    const { qid, optionOne, optionTwo, meta } = this.props.question;
    const { avatarURL, username } = meta;
    const to = `/questions/${qid}`;
    const { left, right } = calculate(optionOne, optionTwo);

    return (
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={{
          pathname: to,
          state: {
            question: this.props.question,
            avatarURL,
            username,
            left,
            right,
            answer: this.props.answer
          }
        }}
      >
        <CardWrapper>
          <CardStripContentWrapper>
            <VerticalBar>
              <CardStripAvatar
                width="50px"
                height="50px"
                alt="profile"
                src={avatarURL}
              />
            </VerticalBar>
            <CardStripBodyWrapper>
              <QuestionWrapper>
                <span style={{ color: "#FD7272" }}>{optionOne.text}</span> or{" "}
                <span style={{ color: "#25CCF7" }}>{optionTwo.text}</span>?
              </QuestionWrapper>
              <Bar left={left} right={right} />
            </CardStripBodyWrapper>
          </CardStripContentWrapper>
        </CardWrapper>
      </Link>
    );
  }
}

Card.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.string
};

export default Card;
