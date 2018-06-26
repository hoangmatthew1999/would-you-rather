import React from "react";
import Header from "../Header";
import { MainWrapper } from "../SharedStyledComponents";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BodyWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`;

export default function Error(props) {
  return (
    <MainWrapper>
      <Header />
      <BodyWrapper>
        <h1>
          404 Page Not Found!{" "}
          <span role="img" aria-label="surprised emoji">
            😯
          </span>
        </h1>
        <Link to="/">Take Me Back to Safety!</Link>
      </BodyWrapper>
    </MainWrapper>
  );
}
