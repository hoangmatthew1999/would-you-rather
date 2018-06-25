import React from "react";
import { FooterWrapper } from "./SharedStyledComponents";

function Footer(props) {
  return (
    <FooterWrapper>
      <a
        href="https://twitter.com/theisomorphic"
        style={{
          fontFamily: `"Quicksand", sans-serif`,
          textDecoration: "none",
          color: "black"
        }}
      >
        Made by @theisomorphic
      </a>
    </FooterWrapper>
  );
}

export default Footer;
