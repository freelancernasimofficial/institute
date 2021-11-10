import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { SnackbarProvider } from "notistack";
import { Fade } from "@mui/material";
import { UserContext } from "../../Contexts/AuthContext";

const Layout = ({ children }) => {
  

  return (
    <React.Fragment>
      <SnackbarProvider
        sx={{
          fontSize: "14px !important",
          '.SnackbarItem-variantInfo': {
            bgcolor:'transparent',boxShadow:'none',padding:'0'
          }
          ,
          '.SnackbarItem-message': {
            p:0,
            svg:{display:'none'}
          }
        }}
        autoHideDuration={2500}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        maxSnack={10}
        TransitionComponent={Fade}
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
