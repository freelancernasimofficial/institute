import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import { ArrowLeft, Home } from "@mui/icons-material";
import { Breadcrumbs } from "@mui/material";

const PageHeader = ({ title, children, navigation = true,icon="" }) => {

  const history = useHistory()
  const location = window?.location?.pathname;

  const path = location.split("/")
  return (
    <React.Fragment>
      <Grid
        sx={{ mb: 2, mt: 3 }}
        alignItems="center"
        justifyContent="space-between"
        container
        spacing={0}
      >
        <Grid item md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {icon}
            <Typography
              sx={{ color: "text.primary", fontSize: "1rem" }}
              variant="h6"
            >
              {title}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 1,
              a: {
                color: "text.primary",
                "&:hover": { textDecoration: "underline" },
                fontSize: "12px",
              },
            }}
          >
            {navigation ? (
              <Breadcrumbs
                sx={{
                  li: { fontSize: "10px" },
                  color: "text.light",
                  a: { color: "text.primary" },
                  alignItems: "start",
                  display: "flex",
                }}
              >
                <Home
                  sx={{ fontSize: "16px", transform: "translateY(1.5px)" }}
                />

                {path.map((breadcrumb, key) => (
                  <Link key={key} to={`/${breadcrumb}`}>
                    {breadcrumb}
                  </Link>
                ))}
              </Breadcrumbs>
            ) : (
              " "
            )}
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {children}
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              color="error"
              startIcon={<ArrowLeft />}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PageHeader;
