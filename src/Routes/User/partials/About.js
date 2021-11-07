import React, { useState } from "react";
import { Call, Mail, Map, School, Work } from "@mui/icons-material";
import {
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableRow,
  Fab,
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import PageLoader from "../../../Components/PageLoader";

const About = ({ response }) => {
  const themeColors = [
    "primary.main",
    "error.main",
    "warning.main",
    "success.main",
    "info.main",
    "orange",
    "blueviolet",
    "green",
    "orange",
    "purple",
    "primary.main",
    "error.main",
    "warning.main",
    "success.main",
    "info.main",
    "orange",
    "blueviolet",
    "green",
    "orange",
    "purple",
    "primary.main",
    "error.main",
    "warning.main",
    "success.main",
    "info.main",
    "orange",
    "blueviolet",
    "green",
    "orange",
    "purple",
    "primary.main",
    "error.main",
    "warning.main",
    "success.main",
    "info.main",
    "orange",
    "blueviolet",
    "green",
    "orange",
    "purple",
    "primary.main",
    "error.main",
    "warning.main",
    "success.main",
    "info.main",
    "orange",
    "blueviolet",
    "green",
    "orange",
    "purple",
  ];
  if (!response) return <PageLoader />;
  return (
    <React.Fragment>
      <Grid container spacing={3} sx={{ mt: 0, mb: 4 }}>
        <Grid item sm={12} md={8}>
          <Card elevation={2}>
            <CardHeader title="Biography" />

            <CardContent sx={{ mt: 0, pt: 0 }}>
              <Typography
                sx={{ mt: 0, pt: 0 }}
                component=""
                variant="body2"
                color="text.secondary"
              >
                {response?.shortBio || "N/A"}
              </Typography>
              <Box mt={3} component="div">
                <Typography mb={1} variant="h6">
                  Skills
                </Typography>
                <Divider light={true} variant="fullWidth" mt={1} />
                <Grid
                  mt={2}
                  alignItems="center"
                  justifyContent="flex-start"
                  container
                  spacing={0}
                  ml={0}
                >
                  {response?.skills?.split(",").map((item, key) => {
                    return (
                      <Grid
                        m={1}
                        item
                        key={key}
                        sx={{
                          textTransform: "uppercase",
                          borderRadius: "3px",
                          padding: "0px 8px",
                          paddingTop: "0 !important",
                          display: "flex",
                          alignItems: "center",
                          bgcolor: `${themeColors[key]}`,
                          fontSize: ".800rem",
                          textAlign: "center",
                        }}
                      >
                        {item}
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <Box mt={4}>
                <Typography variant="h6">Work & Education</Typography>
                <Divider sx={{ mt: 1 }} variant="fullWidth" light={true} />
                <Grid
                  pt={0}
                  mt={0}
                  alignItems="flex-start"
                  justifyContent="fles-start"
                  container
                  direction="row"
                  spacing={3}
                >
                  <Grid pt={0} mt={0} item xs={12} sm={6} md={6}>
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Fab
                        variant="string"
                        size="small"
                        sx={{
                          ml: 0,
                          mr: 1,
                          ":hover": {
                            bgcolor: "error.main",
                            color: "text.primary",
                          },
                          bgcolor: "info.main",
                          color: "text.primary",
                        }}
                      >
                        <Work />
                      </Fab>
                      <Typography variant="h6" sx={{ fontSize: 16 }}>
                        {response?.work || "N/A"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ pl: 0.6, pr: 0.6, textAlign: "justify" }}
                      component="div"
                    >
                      <Typography
                        color="text.secondary"
                        variant="body1"
                        sx={{ fontSize: 13 }}
                      >
                        {response?.workAbout || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid pt={0} item xs={12} sm={6} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        mb: 1,
                      }}
                      component="div"
                    >
                      <Fab
                        size="small"
                        sx={{
                          ml: 0,
                          mr: 1,
                          ":hover": {
                            bgcolor: "primary.main",
                            color: "text.primary",
                          },
                          bgcolor: "success.main",
                          color: "text.primary",
                        }}
                      >
                        <School />
                      </Fab>
                      <Typography variant="h6" sx={{ fontSize: 16 }}>
                        {response?.education || "N/A"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ pl: 0.6, pr: 0.6, textAlign: "justify" }}
                      component="div"
                    >
                      <Typography
                        color="text.secondary"
                        variant="subtitle1"
                        sx={{ fontSize: 13 }}
                      >
                        {response?.educationAbout || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4}>
                <Typography mb={1} variant="h6">
                  Contact
                </Typography>
                <Divider mt={1} light={true} />
                <Grid
                  direction="column"
                  justifyContent="center"
                  mt={0}
                  pt={0}
                  container
                  spacing={3}
                >
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Fab
                          size="small"
                          sx={{
                            bgcolor: "primary.main",
                            color: "text.primary",
                            ":hover": {
                              bgcolor: "secondary.main",
                              color: "text.primary",
                            },
                          }}
                        >
                          <Call />
                        </Fab>
                      </Grid>
                      <Grid item>
                        <Typography variant="span" color="text.info">
                          Mobile
                        </Typography>
                        <Typography
                          variant="b"
                          component="div"
                          color="text.light"
                        >
                          {response?.phone || "N/A"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Fab
                          size="small"
                          sx={{
                            bgcolor: "success.dark",
                            color: "text.primary",
                            ":hover": {
                              bgcolor: "primary.main",
                              color: "text.primary",
                            },
                          }}
                        >
                          <Mail />
                        </Fab>
                      </Grid>
                      <Grid item>
                        <Typography variant="span" color="text.info">
                          Email
                        </Typography>
                        <Typography
                          variant="b"
                          component="div"
                          color="text.light"
                        >
                          {response?.email || "N/A"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Fab
                          size="small"
                          sx={{
                            bgcolor: "error.main",
                            color: "text.primary",
                            ":hover": {
                              bgcolor: "primary.main",
                              color: "text.primary",
                            },
                          }}
                        >
                          <Map />
                        </Fab>
                      </Grid>
                      <Grid item>
                        <Typography variant="span" color="text.info">
                          Address
                        </Typography>
                        <Typography
                          variant="b"
                          component="div"
                          color="text.light"
                        >
                          {response?.city || "N/A"},
                          {response?.Country?.name || "N/A"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sm={12} md={4}>
          <Card elevation={2} sx={{ mb: 2 }}>
            <CardHeader title="Account Details" />
            <CardContent sx={{ mt: 0, pt: 0 }}>
              <TableContainer>
                <Table sx={{ overflow: "hidden" }}>
                  <TableBody
                    sx={{
                      td: {
                        borderBottom: "1px solid black",
                        textAlign: "left",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="text.info"
                          variant="span"
                          component="span"
                        >
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.firstName + " " + response?.lastName}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="span"
                          color="text.info"
                          component="span"
                        >
                          Designation
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.designation || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Gender
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.gender || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Date of Birth
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.month || "N/A"}
                          {" " + response?.date || "N/A"}
                          {", " + response?.year || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Username
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.username || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.email || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Phone
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.phone || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Address
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.address || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          City
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.city || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Postal Code
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.postalCode || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Country
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.light">
                          {response?.Country?.name || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell
                        className="text-success"
                        sx={{ fontWeight: "900" }}
                      >
                        <Typography variant="h6" sx={{ color: "text.success" }}>
                          {response?.isActive ? "Active" : "Inactive"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="span" color="text.info">
                          Account ID
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="span" color="text.warning">
                          {response?.uuId || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default About;
