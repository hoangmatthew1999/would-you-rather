import React from "react";
import styled, { css } from "styled-components";

/*
  Usage:
    <Bar left={20} right={80}/>
*/

const BarWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-auto-rows: 5px;
  justify-self: center;
  align-self: end;
  -moz-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-borderborder-radius: 10px;
  ${({ left, right }) => css`
    grid-template-columns: ${left}% ${right}%;
  `};
`;

const Left = styled.div`
  ${({ right }) =>
    right === 0
      ? css`
          border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-borderborder-radius: 10px;
        `
      : css`
          -webkit-border-top-left-radius: 10px;
          -webkit-border-bottom-left-radius: 10px;
          -moz-border-top-left-radius: 10px;
          -moz-border-bottom-left-radius: 10px;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        `} background: #fd7272;
`;

const Right = styled.div`
  ${({ left }) =>
    left === 0
      ? css`
          border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-border-border-radius: 10px;
        `
      : css`
          -webkit-border-top-right-radius: 10px;
          -webkit-border-bottom-right-radius: 10px;
          -moz-border-top-right-radius: 10px;
          -moz-border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        `} background: #25ccf7;
`;

export default function Bar({ left, right }) {
  return (
    <BarWrapper left={left} right={right}>
      <Left right={right} />
      <Right left={left} />
    </BarWrapper>
  );
} // Bar
