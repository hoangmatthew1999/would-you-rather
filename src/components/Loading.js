import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.h1`
  animation: ${rotate360} 1s linear infinite;
  font-size: 65px;
`;

const LoadingTemplate = styled.div`
  display: inline-block;
  z-index: 10;
  display: grid;
  margin: 0;
  padding: 0;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

export default () => (
  <LoadingTemplate>
    <Loader>
      <span role="img" aria-label="swirl emoji">
        🌀
      </span>
    </Loader>
  </LoadingTemplate>
);
