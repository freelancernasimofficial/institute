import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import App from "./App";
require("dotenv").config();
Axios.defaults.baseURL = process.env.REACT_APP_API;
Axios.defaults.withCredentials = true;
Axios.defaults.headers = {
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);
