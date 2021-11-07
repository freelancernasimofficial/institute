import axios from "axios";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Conversations from "./Conversations";
import {
  Grid,
  Avatar,
  Typography,
  Fab,
  Paper,
  Button,
  TableCell,
  TableRow,
  Card,
  CardHeader,
  CardActions,
  CardContent,
} from "@mui/material";
import { Box } from "@mui/system";
import ChatList from "./ChatList";
import { UserContext } from "../../Contexts/AuthContext";
import PageLoader from "../../Components/PageLoader";
const ConversationsBody = () => {

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        left: 0,
        top: 65,
        padding: "10px",
      }}
    >
      <Grid container spacing={1}>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
            },
          }}
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
        >
          <ChatList />
        </Grid>

        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Conversations />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConversationsBody;
