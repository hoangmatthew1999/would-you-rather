import React from "react";
import styled from "styled-components";
import { handleUnAuthUser } from "../actions/users";
import { connect } from "react-redux";
import { CardStripAvatar } from "./Card";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min-content;
`;

const NavItemsWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`;

const NavAvatarWrapper = styled.div`
  display: grid;
  grid-column-gap: 10px;
  margin: 10px;
  grid-template-columns: min-content min-content;
`;

function Navbar({ users, dispatch }) {
  const { avatarURL, username } = users.users;
  return (
    <NavbarWrapper>
      <NavItemsWrapper>
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Home
        </Link>
        <Link to="/add" style={{ textDecoration: "none", color: "black" }}>
          Add Poll
        </Link>
        <Link
          to="/leaderboard"
          style={{ textDecoration: "none", color: "black" }}
        >
          Rankings
        </Link>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(handleUnAuthUser())}
        >
          Log-out
        </div>
      </NavItemsWrapper>
      <NavAvatarWrapper>
        <h5>{username}</h5>
        <CardStripAvatar
          src={avatarURL}
          width={30}
          height={30}
          position="end"
        />
      </NavAvatarWrapper>
    </NavbarWrapper>
  );
}

export default connect(users => ({ users: users }))(Navbar);
