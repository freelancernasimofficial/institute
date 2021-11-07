import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import LessonCard from "./LessonCard";
import { Box } from "@mui/system";
import CustomAvatar from "../../Components/CustomAvatar";
import { Link, useParams } from "react-router-dom";
import {
  MailOutlined,
  PlayLesson,
  School,
  SupportAgent,
  SupportAgentOutlined,
  VideoCameraFront,
} from "@mui/icons-material";
import useFetch from "../../Hooks/useFetch";
import PageLoader from "../../Components/PageLoader";
import UserName from "../../Components/UserName";
import UserCard from "../../Components/UserCard";
import { MessengerContext } from "../../Contexts/MessengerProvider";

const LessonOverview = () => {
  const params = useParams();
const [state, dispatch] = useContext(MessengerContext);
  const {
    data: course,
    status,
 
  } = useFetch("/admissions/lessons/" + params.id);


   const countVideos = (chapters) => {
     let count = 0;
     chapters?.forEach((ch) => {
       count += ch.totalVideos;
     });
     return count;
   };

  if (status !== "OK") return <PageLoader />;
  return (
    <Container maxWidth="lg" sx={{ bgcolor: "transparent", mb: 4, padding: 0 }}>
      <Card sx={{ mt: 2 }} elevation={2}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography variant="h6" sx={{ fontSize: "25px !important" }}>
                {course.Product.title}
              </Typography>
              <Typography sx={{ textAlign: "justify" }} variant="body2">
                {course.Product.overview}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{
                width: "50%",
                maxHeight: "350px",
                overflow: "hidden",
                mb: 1,
              }}
            >
              <Link to={`/admissions/lessons/${course.Product.uuId}`}>
                <CardMedia
                  sx={{
                    maxHeight: 300,
                    width: "100%",
                    border: "4px solid white",
                    borderRadius: "5px",
                  }}
                  component="img"
                  image={course.Product.thumbnail}
                  alt="Paella dish"
                />
              </Link>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent
          sx={{
            button: { mb: 1 },
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "transparent",
          }}
        >
          <Box>
            <Button sx={{ bgcolor: "primary.main" }} variant="filled">
              <VideoCameraFront />
            </Button>
            <Typography
              sx={{ fontSize: "12px", color: "text.secondary" }}
              variant="h6"
            >
              VIDEOS
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "primary.light",
              }}
              variant="h6"
            >
              {countVideos(course.Product.Chapters)}
            </Typography>
          </Box>
          <Box>
            <Button sx={{ bgcolor: "error.main" }} variant="filled">
              <School />
            </Button>
            <Typography
              sx={{ fontSize: "12px", color: "text.secondary" }}
              variant="h6"
            >
              ENROLLED
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "secondary.light",
              }}
              variant="h6"
            >
              {course.Product.fakeOrderCount + course.Product.totalOrders}
            </Typography>
          </Box>
          <Box>
            <Button sx={{ bgcolor: "success.main" }} variant="filled">
              <SupportAgentOutlined />
            </Button>
            <Typography
              sx={{ fontSize: "12px", color: "text.secondary" }}
              variant="h6"
            >
              SUPPORT
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "success.main",
              }}
              variant="h6"
            >
              YES
            </Typography>
          </Box>
        </CardContent>
        <Paper elevation={1} sx={{ boxShadow: "none" }}>
          <CardActions
            sx={{
              backgroundColor: "transparent !important",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            disableSpacing
          >
            <Box sx={{ display: "flex" }}>
              <UserCard user={course.Product.User} />
            </Box>

            <Box
              sx={{
                ml: 0,
                pl: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Button
                startIcon={<SupportAgent />}
                sx={{
                  marginLeft: "0px !important",
                  m: 1,
                }}
                color="error"
                variant="contained"
              >
                Appoinment
              </Button>

              <Button
                onClick={() =>
                  dispatch({
                    type: "OPEN_MESSENGER",
                    payload: course.Product.User,
                  })
                }
                variant="contained"
                color="primary"
                startIcon={<MailOutlined />}
              >
                Message
              </Button>
            </Box>
          </CardActions>
        </Paper>
      </Card>
      <Card sx={{ m: 0, mt: 2 }} elevation={1}>
        <CardHeader
          avatar={<PlayLesson />}
          subheaderTypographyProps={{
            sx: { fontSize: "14px !important" },
          }}
          titleTypographyProps={{ sx: { fontSize: "20px !important" } }}
          sx={{ p: 2 }}
          title="Lessons"
          subheader={
            course.Product.Chapters?.length +
            " Chapters & " +
            countVideos(course.Product.Chapters) +
            " Videos"
          }
        />
        <Divider variant="fullWidth" light={false} />
        <LessonCard chapters={course.Product.Chapters} />
      </Card>
    </Container>
  );
};

export default LessonOverview;
