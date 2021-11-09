import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import App from "./App";
require("dotenv").config();
Axios.defaults.baseURL =
  window.location.hostname === "lessonlover.com"
    ? process.env.REACT_APP_LIVE_API
    : process.env.REACT_APP_LOCAL_API;
Axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);
