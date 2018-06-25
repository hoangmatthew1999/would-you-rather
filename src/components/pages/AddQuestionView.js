import React, { Component } from "react";
import Header from "../Header";
import {
  MainWrapper,
  BodyWrapper,
  FooterWrapper
} from "../SharedStyledComponents";
import styled from "styled-components";
import { questionsRef } from "../../utils/firebase";

class AddQuestionView extends Component {
  state = {
    optionOne: "",
    optionTwo: ""
  };

  handleOnChange = (e, option) =>
    this.setState({
      [option]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const questionRef = questionsRef.doc();
    const question = {};
  };

  render() {
    console.log(this.state);
    return (
      <MainWrapper>
        <Header>Add a Poll</Header>
        <BodyWrapper>
          <h1>Would you rather...</h1>
          <input
            type="text"
            value={this.state.optionOne}
            onChange={e => this.handleOnChange(e, "optionOne")}
          />
          <h2>or</h2>
          <input
            type="text"
            value={this.state.optionTwo}
            onChange={e => this.handleOnChange(e, "optionTwo")}
          />
        </BodyWrapper>
        <FooterWrapper />
      </MainWrapper>
    );
  }
}

export default AddQuestionView;
