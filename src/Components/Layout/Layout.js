import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { SnackbarProvider } from "notistack";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <SnackbarProvider
        autoHideDuration={2500}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        maxSnack={10}
      >
        <AppHeader />
        <Container
          sx={{
            height: "100%",
            overflow: "auto",
            paddingTop: "65px",
            paddingBottom: "65px",
            position: "absolute",
            top: 0,
            left: 0,
           
          }}
          maxWidth={false}
        >
          {children}
        </Container>
        <AppFooter />
      </SnackbarProvider>
    </React.Fragment>
  );
};
export default Layout;
