import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import Home from "./pages/Home";
import QuestionView from "./pages/QuestionView";
import LoginView from "./pages/LoginView";
import PrivateRoute from "./PrivateRoute";
import AddQuestionView from "./pages/AddQuestionView";

import { auth } from "../utils/firebase";
import { handleAuthedUser, authUserError } from "../actions/users";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(handleAuthedUser(user));
      } else {
        dispatch(authUserError("Please login with your email and password."));
      }
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Redirect {...props} to="/dashboard" />}
          />
          <Route path="/login" component={LoginView} />
          <PrivateRoute path="/dashboard" component={Home} />
          <PrivateRoute path="/add" component={AddQuestionView} />
          <PrivateRoute path="/questions/:qid" component={QuestionView} />
        </Switch>
      </Router>
    );
  }
}

export default connect(({ users }) => ({
  isFetching: users.isFetching,
  uid: users.uid
}))(App);
