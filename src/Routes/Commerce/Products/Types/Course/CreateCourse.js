import React, { useState, useEffect, useContext } from "react";
import Container from "../../Components/Layout/Container";
import PageHeader from "../../Components/Layout/PageHeader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BackButton from "../../Components/BackButton";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { UserContext } from "../../Contexts/AuthContext";
import {
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
  InputLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const CreateCourse = (props) => {
  const [categories,setCategories] = useState([])
  const [title, setTitle] = useState(''); 
  const [categoryId, setCategoryId] = useState(''); 
  const [price, setPrice] = useState(null); 
  const [duration, setDuration] = useState(''); 
  const [discount, setDiscount] = useState(''); 
  const [thumbnail, setThumbnail] = useState('');
  const [overview, setOverview] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const {currentUser} = useContext(UserContext)

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
        .post("/dashboard/courses/create", {
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
          setTitle(null);
          setCategoryId(null);
          setPrice(null);
          setDuration(null);
          setDiscount(null);
          setThumbnail(null);
          setOverview(null);

          setAlert(
            <SweetAlert
              success
              title="Success"
              onConfirm={() => props.history.push("/dashboard/courses")}
              timeout={2000}
            >
              {res.data.message}
            </SweetAlert>
          );
        })
        .catch((err) => {
          setSpinner(null);
          setTitle(null);
          setCategoryId(null);
          setPrice(null);
          setDuration(null);
          setDiscount(null);
          setThumbnail(null);
          setOverview(null);
          setAlert(
            <SweetAlert
              warning
              title="Warning"
              onConfirm={() => setAlert(null)}
              timeout={2000}
            >
              {err.response.data.message}
            </SweetAlert>
          );
          setSpinner(null);
        });
    }, 2000);
  };

  useEffect(() => {
    setCategories(props.data)
    return () => {
      setCategories([])
    };
  }, [props.data]);

    return (
      <>
        <PageHeader title="Add New Course">
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <BackButton />
          </Grid>
        </PageHeader>

        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} lg={8} m="auto">
            <Card>
              <CardContent>
                <form action="#" onSubmit={(e) => handleCourseSubmit(e)}>
                  <FormControl fullWidth>
                    <TextField variant="standard" fullWidth 
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      
                      label="Course Title"
                      type="text"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField variant="standard" fullWidth 
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      
                      label="Course Price"
                      type="text"
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Select Category</InputLabel>
                    <Select fullWidth
                      variant="standard"
                      onChange={(e) => setCategoryId(e.target.value)}
                     
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
                    <TextField variant="standard" fullWidth 
                      required
                      onChange={(e) => setDuration(e.target.value)}
                      
                      label="Duration / Hrs"
                      type="text"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField variant="standard" fullWidth 
                      required
                      onChange={(e) => setDiscount(e.target.value)}
                      
                      label="Discount %"
                      type="text"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField variant="standard" fullWidth 
                      required
                      onChange={(e) => setThumbnail(e.target.value)}
                     
                      label="Embeded Video Link"
                      type="text"
                    />
                  </FormControl>

                  <FormControl>
                   
                      <Typography variant="h6" sx={{mt:2,mb:2}} color="text.white">Course Overview</Typography>
                   
                    <CKEditor
                      editor={ClassicEditor}
                      data={overview}
                      onChange={(_event, editor) => {
                        setOverview(editor.getData());
                      }}
                    />
                  </FormControl>

                  <CardActions>
                    <Button startIcon={<Add/>} type="submit" color="info" variant="contained">
                      {spinner || "Add Course"}
                    </Button>
                  </CardActions>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {alert && alert}
      </>
    );
  }

export default CreateCourse;
