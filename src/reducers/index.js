import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import rankings from "./rankings";

export default combineReducers({ users, questions, rankings });
