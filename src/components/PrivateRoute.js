import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, ...props }) {
  return props.users.users.isAuthed ? (
    <Route {...props} component={Component} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location.pathname }
      }}
    />
  );
}

export default connect(users => ({ users: users }))(PrivateRoute);
