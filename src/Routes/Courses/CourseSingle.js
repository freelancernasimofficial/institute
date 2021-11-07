import React from "react";

import { Card, CardContent, CardHeader, Divider, Grid, Paper, Typography } from "@mui/material";

import CourseCard from "./CourseCard";
import LessonCard from "./LessonCard";
import useFetch from "../../Hooks/useFetch";
import PageLoader from "../../Components/PageLoader";
import { useParams } from "react-router";
import ProductReviews from "../../Components/ProductReviews";
import { Box } from "@mui/system";
import { CoursePayment } from "../../Helpers/PaymentService";

const CourseSingle = () => {

  const { data: course, status } = useFetch(window.location.pathname);

  const countVideos = (chapters) => {
    let count = 0;
    chapters?.forEach((ch) => {
      count += ch.totalVideos;
    });
    return count;
  };

  if (status !== "OK") return <PageLoader />;
  return (
    course && (
      <Grid mt={0} mb={3} container spacing={3}>
        <Grid item md={5} xs={12} sm={12} lg={5} xl={5}>
          <CourseCard course={course} />

          <Box
            sx={{
              display: {
                sm: "none",
                xs: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <ProductReviews
              total={course.totalReviews}
              rating={course.ratingAverage}
              productId={course?.id}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={7} sm={12} lg={7} xl={7}>
          <Card elevation={1}>
            <CardHeader
              subheaderTypographyProps={{
                sx: { fontSize: "16px !important" },
              }}
              titleTypographyProps={{ sx: { fontSize: "25px !important" } }}
              sx={{ p: 2, pb: 0 }}
              title={course?.title}
              subheader="Course Overview"
            />
            <CardContent>
              <Typography variant="body2">{course?.overview}</Typography>
            </CardContent>
          </Card>
          <Card
            elevation={1}
            sx={{
              mt: 1,
            }}
          >
            <CardHeader
              subheaderTypographyProps={{
                sx: { fontSize: "13px !important" },
              }}
              titleTypographyProps={{ sx: { fontSize: "20px !important" } }}
              sx={{ p: 2 }}
              title="Lessons"
              subheader={
                course?.Chapters?.length +
                " Chapters & " +
                countVideos(course?.Chapters) +
                " Videos"
              }
            />
            <Divider variant="fullWidth" />
            <LessonCard chapters={course?.Chapters} />
          </Card>
          <Box
            sx={{
              display: {
                sm: "block",
                xs: "block",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <ProductReviews
              total={course.totalReviews}
              rating={course.ratingAverage}
              productId={course?.id}
            />
          </Box>
        </Grid>
      </Grid>
    )
  );
};

export default CourseSingle;
