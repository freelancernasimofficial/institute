import React, { useCallback, useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import ChatList from "./ChatList";
import Messenger from "../User/partials/Messenger";
import axios from "axios";
import { UserContext } from "../../Contexts/AuthContext";
import PageLoader from "../../Components/PageLoader";
import ChatMessages from "../../Components/Layout/ChatMessages";

const ConversationsBody = () => {
  const [user, setUser] = useState(false);
  const { currentUser } = useContext(UserContext)
  const fetchUrl = window.location.pathname;
const [winHeight, setWinHeight] = useState(400);
   

  useEffect(() => {
     const fetchMessages = async () => {
       const response = await axios.get(fetchUrl);
       if (response?.data?.inbox?.userId === currentUser.id) {
         setUser(response?.data?.inbox?.owner);
       } else {
         setUser(response?.data?.inbox?.User);
       }
     };
    fetchMessages()
  }, [currentUser.id, fetchUrl]);
  
 useEffect(() => {
   setWinHeight(window.innerHeight - 242);
   window.addEventListener("resize", (e) => {
     setWinHeight(window.innerHeight - 242);
   });
   return () => {
     setWinHeight(0);
   };
 }, []);

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
            <ChatMessages
             
              height={90 + winHeight}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
            <Messenger
              width={"100%"}
              height={winHeight}
              mainmenu={true}
              user={user}
              main={true}
            />
          </Grid>
        </Grid>
      </Box>
    );
};

export default ConversationsBody;
