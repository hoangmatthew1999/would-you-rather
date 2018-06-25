import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../Card";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../Header";
import styled from "styled-components";
import { MainWrapper, BodyWrapper } from "../SharedStyledComponents";

import { fetchAndHandleQuestions } from "../../actions/questions";
import Loading from "../Loading";
import Footer from "../Footer";
import { applyDescSort } from "../../utils/tools";

const TabContentWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-row-gap: 10px;
  padding: 5px;
`;

const TabBodyWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

class Home extends Component {
  componentDidMount() {
    const { dispatch, uid } = this.props;
    dispatch(fetchAndHandleQuestions(uid));
  }

  render() {
    const { isFetching, answered, unanswered } = this.props.splitQuestions;

    if (isFetching) {
      return <Loading />;
    }

    return (
      <MainWrapper gridRowGap={"10px"}>
        <Header>
          Would You Rather...{" "}
          <span role="img" aria-label="shrug emojicon">
            🤷🏻‍♂️
          </span>
        </Header>
        <BodyWrapper>
          <Tabs>
            <TabList>
              <Tab>Unanswered</Tab>
              <Tab>Answered</Tab>
            </TabList>
            <TabPanel>
              <TabContentWrapper>
                <h2>Unanswered</h2>
                <TabBodyWrapper>
                  {applyDescSort(unanswered).map(question => (
                    <Card key={question.qid} question={question} />
                  ))}
                </TabBodyWrapper>
              </TabContentWrapper>
            </TabPanel>
            <TabPanel>
              <TabContentWrapper>
                <h2>Answered</h2>
                <TabBodyWrapper>
                  {applyDescSort(answered).map(({ answer, ...question }) => (
                    <Card
                      answered
                      key={question.qid}
                      question={question}
                      answer={answer}
                    />
                  ))}
                </TabBodyWrapper>
              </TabContentWrapper>
            </TabPanel>
          </Tabs>
        </BodyWrapper>
        <Footer />
      </MainWrapper>
    );
  }
}

function mapStateToProps({ questions, users }) {
  return {
    isFetching: questions.isFetching,
    splitQuestions: questions.splitQuestions,
    uid: users.uid
  };
}

export default connect(mapStateToProps)(Home);
