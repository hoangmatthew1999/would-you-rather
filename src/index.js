import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import middleware from "./middleware";

import "./styles.css";

const store = createStore(reducers, middleware);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
