import { ArrowLeftOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  let history = useHistory();
  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<ArrowLeftOutlined/>}
        onClick={() => history.goBack()}
      >
      Back
      </Button>
    </>
  );
};

export default BackButton;
