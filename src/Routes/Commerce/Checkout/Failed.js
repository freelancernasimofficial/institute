import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Failed = () => {
  return (
    <Container>
      <Paper
        elevation={1}
        sx={{
          mt: 4,
          pb: 4,
          display: "flex",
          align: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: 4,
            }}
          >
            <ErrorOutline sx={{ color: "error.main", fontSize: "50px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontSize: 24 }}>
              Payment Failed!
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button href="/" variant="contained" color="primary">
              OK
            </Button>
            <Button href="/" variant="contained" color="error">
              CLOSE
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Failed;
