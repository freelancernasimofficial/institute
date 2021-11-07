import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import BackButton from "../../../components/BackButton";
import Container from "../../../components/layout/Container";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/DataTable";
import { Grid,TableRow,TableCell,Button } from "@mui/material";
import { Box } from "@mui/system";
import { EditOutlined, DeleteOutlined, VisibilityOutlined, AddOutlined } from "@mui/icons-material";

const Products = (props) => {
  const [data, setData] = useState(undefined);
  const [alert, setAlert] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setData(props.data);
    return () => {
      setData(null);
    };
  }, [props.data]);

  const getAllCourse = () => {
    return Axios.get("dashboard/courses")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.response.message);
      });
  };

  const runDeleteRequest = (dataId) => {
    Axios.delete(`/dashboard/courses/delete/${dataId}`)
      .then((response) => {
        setMessage(response.message);
        setAlert(
          <SweetAlert
            success
            title="Deleted"
            onConfirm={() => {
              getAllCourse();
              setAlert(false);
            }}
            timeout={2000}
          >
            {message}
          </SweetAlert>
        );
      })
      .catch((err) => {
        setError(
          <SweetAlert
            success
            title="Deleted"
            onConfirm={() => {
              getAllCourse();
              setAlert(false);
            }}
            timeout={2000}
          >
            {message}
          </SweetAlert>
        );
        setMessage("Something is wrong...");
        setAlert(false);
      });
  };

  const handleDeleteItem = (dataId) => {
    setAlert(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="warning"
        title="Are you sure?"
        onConfirm={() => runDeleteRequest(dataId)}
        onCancel={() => setAlert(false)}
        focusCancelBtn={true}
      >
        You will not be able to recover this data in future!
      </SweetAlert>
    );
  };

  let dataCount = 1;

  return (
    <Container>
      {alert && alert}
      {error && error}
      <PageHeader title="Courses">
        <Grid container spacing={2} justifyContent="end">
          <Grid item>
            <Link to="/dashboard/courses/create">
              <Button
                color="info"
                variant="contained"
                startIcon={<AddOutlined />}
              >
                Add New
              </Button>
            </Link>
          </Grid>

          <Grid item>
            <BackButton />
          </Grid>
        </Grid>
      </PageHeader>

      <DataTable
        title={`You have posted ${data?.length} courses`}
        headers={["id", "title", "category", "price", "action"]}
      >
        {data &&
          data?.map((value, index) => {
            return (
              <TableRow className="text-nowrap" key={index}>
                <TableCell>{dataCount++}</TableCell>
                <TableCell className="font-weight-bold">
                  {value.title}
                </TableCell>
                <TableCell>{value.Category.name}</TableCell>
                <TableCell className="font-weight-bold">
                  {value.price}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link to={`/dashboard/courses/update/${value.id}`}>
                      <Button variant="outlined" color="info">
                        <EditOutlined />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDeleteItem(value.id)}
                      variant="outlined"
                      color="danger"
                    >
                      <DeleteOutlined />
                    </Button>

                    <Link to={`/dashboard/courses/overview/${value.id}`}>
                      <Button variant="outlined" color="primary">
                        <VisibilityOutlined />
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

export default Products;
