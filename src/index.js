import React from "react";
import ReactDOM from "react-dom";
//import App from './App';
import App2 from "./App2";
import "./index.css";

//import Router from 'react-router/BrowserRouter';
import { BrowserRouter as Router } from "react-router-dom";
// import {Router} from 'react-router';

ReactDOM.render(
  <Router>
    <App2 />
  </Router>,
  document.getElementById("root")
);
