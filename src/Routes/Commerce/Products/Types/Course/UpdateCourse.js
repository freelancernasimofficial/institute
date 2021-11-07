import React, { useState, useEffect, useContext } from "react";
import Container from "../../../../../components/layout/Container";
import PageHeader from "../../../../../components/layout/PageHeader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BackButton from "../../../../../components/BackButton";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { UserContext } from "../../../helpers/AuthContext";
import {CardHeader,
  Select,
  FormControl,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Save } from "@mui/icons-material";

const UpdateCourse = (props) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [discount, setDiscount] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [overview, setOverview] = useState("");
  const [spinner, setSpinner] = useState("");
  const [alert, setAlert] = useState("");
  const { currentUser } = useContext(UserContext);

  const handleCourseSubmit = (e) => {
    e.preventDefault();

    setSpinner(
      <BeatLoader
        color="white"
        size={10}
        css={{ marginTop: "5px", display: "block", width: "100%" }}
      />
    );

    setTimeout(() => {
      axios
        .put("/dashboard/courses/update/" + data?.id, {
          title,
          categoryId,
          price,
          duration,
          discount,
          thumbnail,
          overview,
        })
        .then((res) => {
          setSpinner(null);
          setAlert(
            <SweetAlert
              success
              title="Success"
              onConfirm={() => props?.history.push("/dashboard/courses")}
              timeout={2000}
            >
              {res.data?.message}
            </SweetAlert>
          );
        })
        .catch((err) => {
          setAlert(
            <SweetAlert
              warning
              title="Warning"
              onConfirm={() => setAlert(null)}
              timeout={2000}
            >
              {err.message}
            </SweetAlert>
          );
          setSpinner(null);
        });
    }, 2000);
  };

  useEffect(() => {
    setTitle(props?.data?.course?.title);
    setCategoryId(Number(props?.data?.course?.categoryId));
    setPrice(Number(props?.data?.course?.price));
    setDuration(Number(props?.data?.course?.duration));
    setDiscount(Number(props?.data?.course?.discount));
    setThumbnail(props?.data?.course?.thumbnail);
    setOverview(props?.data?.course?.overview);
    setData(props?.data?.course);
    setCategories(props?.data?.categories);
    return () => {
      setData(false);
    };
  }, [props?.data]);

  return (
    data && (
      <form
        style={{ padding: "15px" }}
        action="#"
        onSubmit={(e) => handleCourseSubmit(e)}
      >
        <PageHeader title="Update Course">
          <Grid container spacing={2} justifyContent="flex-end" align="center">
            <BackButton />
          </Grid>
        </PageHeader>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8} m="auto">
            <Card>
              <CardHeader title="Update Course" />
              <CardContent>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="standard"
                    color="primary"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    label="Course Title"
                    type="text"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="standard"
                    color="primary"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    label="Course Price"
                    type="text"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <Select
                    fullWidth
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    variant="standard"
                  >
                    {categories &&
                      categories.map((category) => {
                        return (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="standard"
                    color="primary"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    label="Duration / Hrs"
                    type="text"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="standard"
                    color="primary"
                    required
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    label="Discount %"
                    type="text"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    value={thumbnail}
                    required
                    onChange={(e) => setThumbnail(e.target.value)}
                    label="Embeded Video Link"
                    type="text"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <Typography variant="h6" sx={{ mb: 3 }} color="text.white">
                    Course Overview
                  </Typography>

                  <CKEditor
                    editor={ClassicEditor}
                    data={props?.data?.course?.overview}
                    onChange={(_event, editor) => {
                      setOverview(editor.getData());
                    }}
                  />
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  color="info"
                  startIcon={<Save />}
                  variant="contained"
                >
                  {spinner || "Update Course"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {alert && alert}
      </form>
    )
  );
};

export default UpdateCourse;
