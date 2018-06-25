import styled, { css } from "styled-components";

export const MainWrapper = styled.div`
  height: 100vh;
  display: grid;
  ${props =>
    props.gridRowGap
      ? css`
          grid-row-gap: 10px;
        `
      : null} grid-template-rows: min-content 1fr min-content;
`;

export const BodyWrapper = styled.div`
  height: 100%;
`;

export const FooterWrapper = styled.div``;
