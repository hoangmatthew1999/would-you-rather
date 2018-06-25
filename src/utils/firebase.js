import firebase from "firebase";
import "@firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDqJ10IfiJ5jGQK7lYVUA41h9No6VXhJ_8",
  authDomain: "would-you-rather-1dee0.firebaseapp.com",
  databaseURL: "https://would-you-rather-1dee0.firebaseio.com",
  projectId: "would-you-rather-1dee0",
  storageBucket: "",
  messagingSenderId: "707412449748"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

export const auth = firebase.auth;
export const usersRef = db.collection("users");
export const questionsRef = db.collection("questions");
