import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import Container from "../../../components/layout/Container";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/DataTable";
import {Grid, Button,TableRow,TableCell } from "@mui/material";
import { Box } from "@mui/system";
import { PlayArrowOutlined } from "@mui/icons-material";

const LessonList = (props) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setData(props.data);
    return () => {
      setData(null);
    };
  }, [props.data]);

  let dataCount = 1;

  return (
    <Container>
      <PageHeader title="Lessons">
        <Grid container spacing={3} justifyContent="end">
          <Grid item>
            <BackButton />
          </Grid>
        </Grid>
      </PageHeader>

      <DataTable
        title={`You Have Bought ${data?.length} Courses`}
        headers={["id", "title", "action"]}
      >
        {data &&
          data.map((value, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{dataCount++}</TableCell>
                <TableCell
                  style={{ maxWidth: "80%" }}
                  className="font-weight-bold"
                >
                  {value.Course.title}
                </TableCell>

                <TableCell>
                  <Box>
                    <Link to={`/dashboard/lessons/overview/${value.id}`}>
                      <Button variant="outlined" color="danger">
                        <PlayArrowOutlined />
                      </Button>
                    </Link>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
      </DataTable>
    </Container>
  );
};

export default LessonList;
