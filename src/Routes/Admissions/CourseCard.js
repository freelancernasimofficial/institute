import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../Components/Layout/PageHeader";
import Axios from "axios";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
    AddShoppingCart,
    PlayCircle,
    RemoveRedEyeOutlined,
  School,
  SupportAgent,
  SupportAgentOutlined,
  VideoCameraFront,
} from "@mui/icons-material";
import moment from "moment";

const countVideos = (chapters) => {
   
    let count = 0;
    chapters?.forEach(chapter => {
    count += chapter?.totalVideos;
    })
    
    return count.toString()
}

const CourseCard = ({course}) => {
  return (
    <Card elevation={1}>
      <CardHeader
        
        avatar={
          course?.User?.avatar ? (
            <Avatar alt="emanush.com" src={course?.User?.avatar} />
          ) : (
            <Avatar
              sx={{
                bgcolor: "secondary.dark",
                color: "common.white",
              }}
              aria-label="recipe"
            >
              {course?.User?.firstName?.substr(0, 1)}
            </Avatar>
          )
        }
        title={
          <React.Fragment>
            <Link to={`/user/${course?.User?.username || course?.User?.uuId}`}>
              {course?.User?.firstName + " " + course?.User?.lastName}
            </Link>
          </React.Fragment>
        }
        subheader={course?.User?.designation}
      />
      <CardContent
        sx={{
         
        
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            a: { "&:hover": { color: "primary.light" } },
          }}
          variant="h6"
          component="h6"
        >
          <Link to={`/admissions/lessons/${course?.uuId}`}>
            {" "}
            {course?.title}
          </Link>
        </Typography>
      </CardContent>
<Divider variant="fullWidth" light={true} />
      <CardContent
        sx={{
          button: { mb: 1, ml: 1 },
          textAlign: "center",
       
          padding: "15px 15px",
        }}
      >
        <Box
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            h6: { fontSize: "10px", textAlign: "center" },
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            VIDEOS
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            STUDENTS
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            SUPPORT
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            h6: { fontSize: "15px", textAlign: "center" },
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            <VideoCameraFront sx={{ mr: 1, color: "primary.light" }} />{" "}
            {countVideos(course?.Chapters)}
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            <School sx={{ mr: 1, color: "error.light" }} />{" "}
            {course.fakeOrderCount + course.totalOrders}
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            <SupportAgentOutlined sx={{ mr: 1, color: "success.light" }} /> YES
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
        
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        disableSpacing
      >
        <Button
          startIcon={<SupportAgent />}
          sx={{ ml: 1, bgcolor: "primary.main" }}
          variant="filled"
        >
          Appoinment
        </Button>

        <Button
          startIcon={<PlayCircle />}
          sx={{
            ml: 1,
            bgcolor: "secondary.main",
            a: { "&:hover": { textDecoration: "none !important" } },
          }}
          variant="filled"
        >
          <Link
            style={{ margin: 0, padding: 0 }}
            to={`/admissions/lessons/${course?.uuId}`}
          >
            Start Lesson
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
