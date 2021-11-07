import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Contexts/AuthContext";
import FeedCard from "../../Home/Components/FeedCard";
import PostForm from "../../Home/Components/PostForm";
import { useSnackbar } from "notistack";
import { EmojiEmotionsOutlined, PhotoCamera, School, Send, Videocam, Work } from "@mui/icons-material";
import PageLoader from "../../../Components/PageLoader";
import useFetch from "../../../Hooks/useFetch";
import CustomAvatar from "../../../Components/CustomAvatar";

const Timeline = ({ userId, ...rest }) => {
  const { currentUser } = useContext(UserContext);
  const [postForm, setPostForm] = useState(true);
  const [timelinePosts, setTimelinePosts] = useState([]);
  const { data,status, refetch } = useFetch(`/user/${userId}/timeline`);

  useEffect(() => {
    setPostForm(rest.postForm)

  }, [rest]);

  useEffect(() => {
    setTimelinePosts(data);
    return () => {
      setTimelinePosts([]);
    };
  }, [data]);
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
  if (status === "LOADING") return <PageLoader />;
  return (
    <React.Fragment>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={2}
        mt={0.5}
      >
        <Grid
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
            },
          }}
          item
          sm={12}
          xs={12}
          md={6}
        >
          <Box sx={{ position: "sticky" }}>
            <Card elevation={2}>
              <CardHeader
                sx={{ pt: 3 }}
                title={
                  <React.Fragment>
                    Biography
                    <Divider variant="fullWidths" sx={{ mt: 1 }} />
                  </React.Fragment>
                }
              />
              <CardContent>
                <Typography component="" variant="body2" color="text.secondary">
                  {timelinePosts?.user?.shortBio || "N/A"}
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
                    {timelinePosts?.user?.skills
                      ?.split(",")
                      .map((item, key) => {
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
                  <Divider sx={{ mt: 1 }} variant="fullWidth" />
                  <Grid
                    pt={0}
                    mt={0}
                    alignItems="flex-start"
                    justifyContent="fles-start"
                    container
                    direction="column"
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
                        <Typography variant="h6">
                          {timelinePosts?.user?.work || "N/A"}
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
                          {timelinePosts?.user?.workAbout || "N/A"}
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
                        <Typography variant="h6">
                          {timelinePosts?.user?.education || "N/A"}
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
                          {timelinePosts?.user?.educationAbout || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {userId === currentUser?.id &&
            (postForm === true ? (
              <Paper
                onClick={() => setPostForm(false) + rest.setPostForm(false)}
                sx={{
                  ":focus": { outline: "none" },
                  m: "auto",
                  mb: 1,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box ml={1}>
                    {currentUser && <CustomAvatar user={currentUser} />}
                  </Box>

                  <TextField
                    variant="standard"
                    placeholder="What's on your mind?"
                    type="text"
                    fullWidth={true}
                    sx={{
                      "&:hover": {
                        borderBottom: "0px",
                        outline: "none",
                      },
                    }}
                    inputProps={{
                      sx: {
                        borderBottom: "0",

                        ":focus": {
                          "&::before": {
                            content: "none",
                          },
                          "&::after": {
                            content: "none",
                          },
                        },
                        "&:hover": {
                          outline: "none",
                          borderBottom: 0,
                          "&:before": {
                            content: "none",
                          },
                          "&:after": {
                            content: "none",
                          },
                        },
                      },
                    }}
                    InputProps={{
                      sx: {
                        borderBottom: "0",
                        p: 3,
                        ":focus": {
                          "&::before": {
                            borderBottom: "0px",
                            outline: "none",
                          },
                          "&::after": {
                            borderBottom: "0px",
                            outline: "none",
                          },
                        },
                        "&:hover": {
                          outline: "none",
                          borderBottom: 0,
                          "&::before": {
                            content: "none",
                          },
                          "&::after": {
                            content: "none",
                          },
                        },
                        "&::before": {
                          content: "none",
                        },
                        "&::after": {
                          content: "none",
                        },
                      },
                    }}
                  />
                  <IconButton>
                    <Send />
                  </IconButton>
                </Box>
                <Divider variant="fullWidth" light />
                <Box
                  sx={{
                    p: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <PhotoCamera />
                  </IconButton>
                  <IconButton>
                    <EmojiEmotionsOutlined />
                  </IconButton>
                  <IconButton>
                    <Videocam />
                  </IconButton>
                </Box>
              </Paper>
            ) : (
              <PostForm
                refetch={refetch}
                close={() => setPostForm(true) + rest.setPostForm(true)}
              />
            ))}
          <Divider variant="fullWidth" />
          {timelinePosts?.timeline?.map((post, key) => {
            return (
              <FeedCard
                maxWidth="100% !important"
                refetch={refetch}
                key={key}
                post={post}
              />
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Timeline;
