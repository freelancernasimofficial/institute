import React, { useEffect, useState } from "react";

import Axios from "axios";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

import FeedLeftSidebar from "../Home/Components/FeedLeftSidebar";
import CourseCard from "./CourseCard";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import PageHeader from "../../Components/Layout/PageHeader";
import useFetch from "../../Hooks/useFetch";
import PageLoader from "../../Components/PageLoader";
import { DoubleArrowOutlined } from "@mui/icons-material";
import Categories from "../../Components/Categories";
const Courses = () => {
  const { data, status } = useFetch("/courses");
  const { data:categories, status: catStatus } = useFetch(
    `/products/categories/course`
  );

  if (catStatus !== "OK" || status !== "OK") return <PageLoader />;
  return (
    data && (
      <React.Fragment>
        <PageHeader title="Courses" />
        <Grid mt={0} mb={3} container spacing={3}>
          <Grid item xs={12} md={3} sm={12} lg={3} xl={3}>
            <Categories params="/courses/categories" data={categories} />
          </Grid>

          <Grid item md={9} xs={12} sm={12} lg={9} xl={9}>
            <Grid container spacing={3}>
              {data?.map((course, key) => {
                return (
                  <Grid key={key} item md={6} xs={12} sm={12}>
                    <CourseCard course={course} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  );
};

export default Courses;
