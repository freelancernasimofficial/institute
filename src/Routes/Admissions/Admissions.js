import React, { useEffect, useState } from "react";


import { Grid } from "@mui/material";

import CourseCard from "./CourseCard";
import PageHeader from "../../Components/Layout/PageHeader";
import useFetch from "../../Hooks/useFetch";
import PageLoader from "../../Components/PageLoader";
const Admissions = () => {

 const {data,status} = useFetch('/admissions');

if(status !=="OK") return <PageLoader/>
  return (
    data && (
      <React.Fragment>
        <PageHeader title="Recent Admissions"></PageHeader>
        <Grid container spacing={3} mt={0} sx={{mb:7}}>
          {data?.map((course, key) => {
            return (
              <Grid key={key} item xs={12} sm={12} md={4} lg={4} xl={4}>
                <CourseCard course={course.Product} />
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    )
  );
};

export default Admissions;
