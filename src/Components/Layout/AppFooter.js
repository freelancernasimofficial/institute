import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import {Menu, Apps, Home, Mail } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Button, Drawer, Grid, Stack } from "@mui/material";
import AppDrawer from "./AppDrawer";
import MessengerLayout from "../../Routes/User/partials/MessengerLayout";


const AppFooter = () => {
  
  const [drawer, setdrawer] = useState(false);

  return (
    <React.Fragment>
      <MessengerLayout />
      <Paper
        sx={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: "0",
          height: "65px",
          zIndex: 999,
          svg: { fontSize: "22px" },
          alignItems: "center",
          justifyContent: "center",
        }}
        elevation={1}
      >
        <Stack
          component="div"
          sx={{
            flexDirection: "row",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => setdrawer(true)}>
            <Menu
              sx={{ color: "text.primary", "&:hover": { cursor: "pointer" } }}
            />
          </Button>

          <Button>
            <Link to="/">
              <Home sx={{ color: "text.primary" }} />
            </Link>
          </Button>
          <Button>
            {" "}
            <Link to="/messages">
              <Mail sx={{ color: "text.primary" }} />
            </Link>
          </Button>
        </Stack>
      </Paper>
      <Drawer
        PaperProps={{
          sx: {
            width: "300px",
          },
        }}
        elevation={0}
        variant="temporary"
        onBackdropClick={() => setdrawer(false)}
        open={drawer}
      >
        <AppDrawer />
      </Drawer>
    </React.Fragment>
  );
}
export default AppFooter;