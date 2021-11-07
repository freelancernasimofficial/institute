import React, { useState, useEffect } from "react";
import Container from "../../../../../components/layout/Container";
import PageHeader from "../../../../../components/layout/PageHeader";
import BackButton from "../../../../../components/BackButton";
import axios from "axios";
import ChapterAccordion from "../../../../../components/ChapterAccordion";
import SweetAlert from "react-bootstrap-sweetalert";
import { Box } from "@mui/system";
import {CardHeader,TextField,Typography,MenuItem,Card,CardContent,CardActions, Button,Grid, Select,FormControl, InputLabel } from "@mui/material";
import { AddOutlined, Cancel, Save } from "@mui/icons-material";

const CourseOverview = (props) => {
 
  const [data, setData] = useState(null);
  const [showChapters, setShowChapters] = useState(true);

  const [chapterForm, setChapterForm] = useState(false);
  const [chapterEdit, setChapterEdit] = useState(false);

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDesc, setChapterDesc] = useState("");

  const [lessonForm, setLessonForm] = useState(undefined);
  const [chapterId, setChapterId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("undefined");
  const [alert, setAlert] = useState(false)
  const showEditChapterForm = (e, chapterId) => {
    setChapterForm(false)
    setLessonForm(false)
    setShowChapters(false)
    setChapterId(Number(chapterId));
    setChapterEdit(true);
    if (chapterId && data) {
      const editChapterData = data?.Chapters.filter(
        (chapter) => chapter.id === chapterId
      );
      setChapterTitle(editChapterData[0].name);
      setChapterDesc(editChapterData[0].description);
    }
  };

  const deleteChapterHttp = (chapterId) => {
    axios
      .delete(`dashboard/courses/delete/chapter/${Number(chapterId)}`)
      .then((res) => {
        setAlert(
          <SweetAlert
            success
            title="Deleted!"
            onConfirm={() => {
              setAlert(false);
              setShowChapters(true);
              setChapterEdit(false);
              setChapterForm(false);
              fetchChapters();
            }}
            timeout={2000}
          >
            Data has been saved.
          </SweetAlert>
        );
      })
      .catch((err) => {
        setAlert(
          <SweetAlert
            Warning
            title="Could not delete!"
            onConfirm={() => {
              setAlert(false);
              setShowChapters(true);
              setChapterEdit(false);
              setChapterForm(false);
              fetchChapters();
            }}
            timeout={2000}
          >
            Something is wrong...
          </SweetAlert>
        );
      });
      
  }

  const deletelessonHttp = (lessonId) => {
    axios
      .delete(`dashboard/courses/chapters/delete/lesson/${Number(lessonId)}`)
      .then((res) => {
        setAlert(
          <SweetAlert
            success
            title="Deleted!"
            onConfirm={() => {
              setAlert(false);
              setShowChapters(true);
              setChapterEdit(false);
              setChapterForm(false);
              fetchChapters();
            }}
            timeout={2000}
          >
            Data has been saved.
          </SweetAlert>
        );
      })
      .catch((err) => {
        setAlert(
          <SweetAlert
            Warning
            title="Could not delete!"
            onConfirm={() => {
              setAlert(false);
              setShowChapters(true);
              setChapterEdit(false);
              setChapterForm(false);
              fetchChapters();
            }}
            timeout={2000}
          >
            Something is wrong...
          </SweetAlert>
        );
      });
  };

  const addLessonReq = () => {
    axios
      .post("dashboard/courses/chapters/create/lesson", {
        chapterId: chapterId,
        videoTitle: videoTitle,
        iframeUrl: videoUrl,
      })
      .then((res) => {
        setAlert(
          <SweetAlert
            success
            title="Saved!"
            onConfirm={() => {
              setAlert(false);
              setShowChapters(true);
              setChapterEdit(false);
              setChapterForm(false);
              setLessonForm(false)
              fetchChapters();
            }}
            timeout={2000}
          >
            Data has been saved.
          </SweetAlert>
        );
      })
      .catch((err) => {
        setAlert(
          <SweetAlert
            warning
            title="Warning!"
            onConfirm={() => {
              setAlert(false);
              setLessonForm(false)
              setShowChapters(true);
              setChapterEdit(false);
              fetchChapters();
            }}
            timeout={2000}
          >
            Something is wrong...
          </SweetAlert>
        );
      });
  };

  const handleAddChapter = () => {
    
    axios
      .post("dashboard/courses/create/chapter", {
        courseId: data?.id,
        name: chapterTitle,
        description: chapterDesc,
      })
      .then((res) => {
        setAlert(
          <SweetAlert
            success
            title="Saved!"
            onConfirm={() => {
              setAlert(false);
              setShowChapters(true);
              setChapterEdit(false);
              setChapterForm(false)
              fetchChapters()
            }}
            timeout={2000}
          >
            Data has been saved.
          </SweetAlert>
        );
      })
      .catch((err) => {
        setAlert(
          <SweetAlert
            warning
            title="Warning!"
            onConfirm={() => {
              setAlert(false);
    setShowChapters(true);
              setChapterEdit(false);
                fetchChapters();
            }}
            timeout={2000}
          >
            Something is wrong...
          </SweetAlert>
        );
      })
      
  };

  const fetchChapters = () => {

      axios
        .get(`dashboard/courses/overview/${data?.id}`)
        .then((res) => {
         
          setData(res.data.course);
        })
        .catch((err) => {
          setAlert(
            <SweetAlert
              warning
              title="Warning!"
              onConfirm={() => {
                setAlert(false);
                setShowChapters(true);
              }}
              timeout={2000}
            >
              Something is wrong...
            </SweetAlert>
          );
        });
    
  }
  const updateChapter = () => {
   
    axios
      .put(`dashboard/courses/update/chapter/${chapterId}`, {
        id: chapterId,
        name: chapterTitle,
        description: chapterDesc,
      })
      .then((res) => {
        fetchChapters()
        setAlert(
          <SweetAlert
            success
            title="Updated"
            onConfirm={() => {
              setAlert(false);
              setShowChapters(true);
              setChapterEdit(false)
          
            }}
            timeout={2000}
          >
            Data has been edited.
          </SweetAlert>
        );
      })
      .catch((err) => {
       setAlert(
         <SweetAlert
           warning
           title="Warning!"
           onConfirm={() => {
             setAlert(false);
             setShowChapters(true);
           }}
           timeout={2000}
         >
           Something is wrong...
         </SweetAlert>
       );
      })
  };


  useEffect(() => {
    setShowChapters(true)
    setData(props.data?.course);
    return () => {
     setData(false)
    };
  }, [props?.data]);


  return (
    data && (
      <>
        <Box>
          <PageHeader title={data?.title}>
            <Grid container spacing={3} justifyContent="end">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddOutlined />}
                  onClick={() =>
                    setChapterForm(true) +
                    setLessonForm(false) +
                    setShowChapters(false) +
                    setChapterEdit(false)
                  }
                >
                  Chapter
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddOutlined />}
                  onClick={() =>
                    setLessonForm(true) +
                    setChapterForm(false) +
                    setShowChapters(false) +
                    setChapterEdit(false)
                  }
                >
                  Lesson
                </Button>
              </Grid>
              <Grid item>
                <BackButton />
              </Grid>
            </Grid>
          </PageHeader>

          {lessonForm && (
            <Card>
              <CardHeader title="Add New Video Lesson" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <FormControl fullWidth>
                      <InputLabel>Select a Chapter</InputLabel>
                      <Select fullWidth
                        variant="standard"
                        onChange={(e) => {
                          setChapterId(Number(e.target.value));
                        }}
                      >
                        {data?.Chapters.map((value, index) => {
                          return (
                            <MenuItem key={index} value={Number(value.id)}>
                              {value.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Lesson Title"
                        type="text"
                        onChange={(e) => setVideoTitle(e.target.value)}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Lesson Video Iframe Url"
                        type="text"
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <div className="btn-list">
                        <button
                          onClick={() => addLessonReq()}
                          className="btn btn-success"
                          type="submit"
                        >
                          <i className="fe fe-save"></i> SAVE
                        </button>
                        <button
                          onClick={() =>
                            setLessonForm(false) + setShowChapters(true)
                          }
                          className="btn btn-danger"
                          type="button"
                        >
                          <i className="fe fe-x"></i> Cancel
                        </button>
                      </div>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {chapterForm && (
            <Card>
              <CardHeader title="Add New Chapter" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Chapter Title"
                        onChange={(e) => setChapterTitle(e.target.value)}
                        type="text"
                        value={chapterTitle}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        label="Description"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setChapterDesc(e.target.value)}
                        defaultValue={chapterDesc}
                      ></TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <Box
                        component="div"
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        <Button
                          sx={{ mr: 2 }}
                          startIcon={<Save />}
                          onClick={handleAddChapter}
                          variant="contained"
                          color="info"
                          type="submit"
                        >
                          SAVE
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<Cancel />}
                          onClick={() =>
                            setChapterForm(false) + setShowChapters(true)
                          }
                          color="error"
                          type="button"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {chapterEdit && data && (
            <Card>
              <CardHeader title=" Edit Chapter" />
              <CardContent>
                <Grid container spacing={3}>
                
                  <Grid item xs={12} lg={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Chapter Title"
                        onChange={(e) => setChapterTitle(e.target.value)}
                        type="text"
                        value={chapterTitle}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Description"
                        multiline
                        className="form-control w100"
                        onChange={(e) => setChapterDesc(e.target.value)}
                        defaultValue={chapterDesc}
                      ></TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <Box component="div" sx={{ display: "flex" }}>
                        <Button
                          fullWidth
                          onClick={() => updateChapter()}
                          variant="contained"
                          color="info"
                          type="submit"
                          startIcon={<Save />}
                        >
                          SAVE
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            setChapterEdit(false) + setShowChapters(true)
                          }
                          startIcon={<Cancel />}
                          type="button"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {showChapters && (
            <ChapterAccordion
              showEditChapterForm={showEditChapterForm}
              deleteChapterHttp={deleteChapterHttp}
              deleteLesson={deletelessonHttp}
              chapters={data?.Chapters}
              title={`Course Curriculum (${data?.Chapters?.length})`}
            />
          )}
        </Box>
        {alert && alert}
      </>
    )
  );
};

export default CourseOverview;
