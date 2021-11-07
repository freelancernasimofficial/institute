import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import {useHistory} from 'react-router-dom'
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import PageLoader from "../Components/PageLoader";
import useFetch from "../Hooks/useFetch";
import { SocketContext } from "../Contexts/Socket";

const Router = ({ view: Component, ...rest }) => {
  const socket = useContext(SocketContext);
  const history = useHistory()
  useEffect(() => {
    axios
      .get("/states")
      .then((response) => {
      
      })
      .catch((error) => {
       history.push("/login")
      });

  }, [history, socket])
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Component
          {...routeProps}
        />
      )}
    />
  );
};

export default React.memo(Router);
