import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
const Messages = () => {

  const [winHeight, setwinHeight] = useState(0);

    useEffect(() => {
      setwinHeight(window.innerHeight - 150);
      window.addEventListener("resize", (e) => {
        setwinHeight(window.innerHeight - 150);
      });
      return () => {
        setwinHeight(0);
      };
    }, []);
  return (
    ChatList && (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 55,
          padding: "10px",
        }}
      >
      <Grid
        sx={{ mt:'2px',  height: winHeight+17, position: "relative", }}
        container
        spacing={1}
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={12} md={4}>
          <ChatList />
        </Grid>

        <Grid
          sx={{ mt: 0, width: "100%", height: winHeight+7, position: "relative" }}
          item
          xs={12}
          sm={12}
          md={8}
        >
          <Box component={Paper} sx={{ width: "100%", height: "100%",display: "flex",alignItems:'center',justifyContent:'center'}}>
            <Typography sx={{fontWeight:'800',fontSize:'1.5rem'}} variant="h6" color="text.primary">
              Start Conversation
            </Typography>
          </Box>
        </Grid>
        </Grid>
        </Box>
    )
  );
};

export default Messages;
