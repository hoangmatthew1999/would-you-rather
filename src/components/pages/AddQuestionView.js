import React, { Component } from "react";
import Header from "../Header";
import { MainWrapper } from "../SharedStyledComponents";
import styled, { css } from "styled-components";
import { questionsRef } from "../../utils/firebase";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/questions";

const BodyWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;

const OrWrapper = styled.form`
  align-self: center;
  display: grid;
  grid-template-rows: 100px min-content 100px;
`;

const StyledInput = styled.input`
  padding: 0;
  margin: 0;
  font-size: 1.7em;
  text-align: center;
  outline: none;
  border: none;
  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `};
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2px;
`;

const Button = styled.button`
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`;

const TextWrapper = styled.div`
  justify-self: center;
  text-align: center;
  font-size: 1.5em;
`;

class AddQuestionView extends Component {
  state = {
    optionOne: "",
    optionTwo: ""
  };

  disabled = () => this.state.optionOne === "" || this.state.optionTwo === "";

  handleOnChange = (e, option) =>
    this.setState({
      [option]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const questionRef = questionsRef.doc();
    const qid = questionRef.id;
    const question = {
      qid,
      meta: this.props.meta,
      optionOne: {
        text: optionOne
      },
      optionTwo: {
        text: optionTwo
      },
      timestamp: Date.now()
    };
    this.props.dispatch(handleAddQuestion(question));
    this.props.history.push("/home");
  };

  render() {
    return (
      <MainWrapper>
        <Header>Add Poll</Header>
        <BodyWrapper>
          <TextWrapper>
            <h2>Would you rather...</h2>
          </TextWrapper>
          <OrWrapper id="would-you-rather-form" onSubmit={this.handleSubmit}>
            <StyledInput
              color="#FD7272"
              placeholder="Option 1"
              value={this.state.optionOne}
              onChange={e => this.handleOnChange(e, "optionOne")}
            />
            <TextWrapper>
              <h2>
                <u>Or</u>
              </h2>
            </TextWrapper>
            <StyledInput
              color="#25CCF7"
              placeholder="Option 2"
              value={this.state.optionTwo}
              onChange={e => this.handleOnChange(e, "optionTwo")}
            />
          </OrWrapper>
          <ButtonsWrapper>
            <Button
              disabled={this.disabled()}
              onClick={() => this.setState({ optionOne: "", optionTwo: "" })}
            >
              Clear All
            </Button>
            <Button
              disabled={this.disabled()}
              form="would-you-rather-form"
              type="submit"
            >
              Add Poll
            </Button>
          </ButtonsWrapper>
        </BodyWrapper>
      </MainWrapper>
    );
  }
}

function mapStateToProps({ users }) {
  const { uid, avatarURL, username } = users;
  return {
    meta: {
      uid,
      avatarURL,
      username
    }
  };
}

export default connect(mapStateToProps)(AddQuestionView);
