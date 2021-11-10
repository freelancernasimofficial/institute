import React, { useReducer, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Paper,
} from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import EditProfileReducer from "../../Reducers/EditProfileReducer";
import useFetch from "../../Hooks/useFetch";
import PageLoader from "../../Components/PageLoader";
import ChangePhoto from "../../Components/ChangePhoto";
import CustomAvatar from "../../Components/CustomAvatar";

const EditProfile = () => {
  const history = useHistory();
  const params = useParams();
  const { currentUser } = useContext(UserContext);

  const { data, status } = useFetch("/user/" + params.id + "/edit");
  const [state, dispatch] = useReducer(EditProfileReducer, {});
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [changeProfilePhoto,setChangeProfilePhoto] = useState(true)
  const [changeCoverPhoto, setChangeCoverPhoto] = useState(false);
  useEffect(() => {
    dispatch({ type: "RESPONSE", ...data });
  }, [data]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      newPassword !== "" &&
      oldPassword !== "" &&
      confirmNewPassword !== "" &&
      newPassword === confirmNewPassword
    ) {
      try {
        const changeRequest = await axios.put("/user/update-password", {
          oldPassword,
          newPassword,
          confirmNewPassword,
        });
        if (changeRequest) {
          enqueueSnackbar("Password Changed", { variant: "success" });
        }
      } catch (error) {
        enqueueSnackbar("Old password doesn't match!", { variant: "warning" });
      }
    } else {
      enqueueSnackbar("Confirm password doesn't match!", {
        variant: "warning",
      });
    }
  };
  const handleEditProfile = (e) => {
    e.preventDefault();
    axios
      .put(`/user/${state?.id}/edit`, state)
      .then((res) => {
        enqueueSnackbar("Profile has been updated!", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Something went wrong!", { variant: "warning" });
      })
      .finally(() => {
        history.push(`/user/${currentUser.username || currentUser.uuId}`);
      });
  };

  if (status === "LOADING") return <PageLoader />;
  return (
    state && (
      <Grid
        container
        alignItems="flex-start"
        justifyContent="space-between"
        maxWidth="lg"
        m="auto"
        mt={2}
      >
        <Grid item md={4} xs={12} sm={12}>
          <Paper sx={{ p: 0 }}>
            <CardContent
              sx={{ padding: "0 !important", bgcolor: "background.default" }}
            >
              {changeCoverPhoto && (
                <Box mb={4}>
                  <Button
                    onClick={() =>
                      setChangeCoverPhoto(false) + setChangeProfilePhoto(true)
                    }
                    variant="contained"
                    color="primary"
                  >
                    Change Profile Photo
                  </Button>
                  <img
                    style={{ width: "100%" }}
                    alt="cover"
                    src={data.coverphoto}
                  />
                  <ChangePhoto name="cover" params="/user/change-cover" />
                </Box>
              )}

              {changeProfilePhoto && (
                <Box mb={4}>
                  <Paper elevation={1}>
                    <Button
                      onClick={() =>
                        setChangeCoverPhoto(true) + setChangeProfilePhoto(false)
                      }
                      variant="outlined"
                      color="primary"
                    >
                      Change Cover Photo
                    </Button>
                  </Paper>
                  <CustomAvatar
                    sx={{ width: 200, height: 200, margin: "30px auto" }}
                    user={data}
                  />
                  <ChangePhoto name="avatar" params="/user/change-avatar" />
                </Box>
              )}
            </CardContent>
          </Paper>
          <Card sx={{ mt: 4 }}>
            <CardHeader title="Change Password" />

            <CardContent>
              <TextField
                sx={{ mb: 4 }}
                value={oldPassword || ""}
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                variant="standard"
                color="primary"
                placeholder="Old Password"
                fullWidth
                autoFocus={true}
              />

              <TextField
                sx={{ mb: 4 }}
                value={newPassword || ""}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                variant="standard"
                color="primary"
                placeholder="New Password"
                fullWidth
              />

              <TextField
                sx={{ mb: 4 }}
                value={confirmNewPassword || ""}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                type="password"
                variant="standard"
                color="primary"
                placeholder="Confirm Password"
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Button
                onClick={(e) => handleChangePassword(e)}
                startIcon={<Save />}
                variant="contained"
                color="primary"
              >
                Change
              </Button>

              <Link to={`/user/${currentUser.username || currentUser.uuId}`}>
                <Button
                  startIcon={<Cancel />}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <Box sx={{ margin: "5px !important", padding: "0px !important" }}>
            <Card>
              <form
                method="post"
                onSubmit={(e) => handleEditProfile(e)}
                action="#"
              >
                <CardHeader title="Edit Profile" />
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        type="text"
                        value={state.firstName || ""}
                        onChange={(e) => {
                          dispatch({
                            type: "firstName",
                            firstName: e.target.value,
                          });
                        }}
                        placeholder="First Name"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        value={state.lastName || ""}
                        onChange={(e) => {
                          dispatch({
                            type: "lastName",
                            lastName: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder="Last Name"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        value={state.designation || ""}
                        onChange={(e) => {
                          dispatch({
                            type: "designation",
                            designation: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder="Designation"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        value={state.email || ""}
                        onChange={(e) => {
                          dispatch({
                            type: "email",
                            email: e.target.value,
                          });
                        }}
                        type="email"
                        placeholder="Email"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        onChange={(e) => {
                          dispatch({
                            type: "phone",
                            phone: e.target.value,
                          });
                        }}
                        value={state.phone || ""}
                        type="text"
                        placeholder="Phone number"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FormControl fullWidth>
                        <Select
                          variant="standard"
                          onChange={(e) => {
                            dispatch({
                              type: "gender",
                              gender: e.target.value,
                            });
                          }}
                          value={state.gender || "Male"}
                        >
                          <MenuItem data-select2-id={5}>--Select--</MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControl fullWidth sx={{ mb: 4, mr: 2 }}>
                          <InputLabel sx={{ left: "-13px" }}>Date</InputLabel>
                          <Select
                            variant="standard"
                            onChange={(e) => {
                              dispatch({
                                type: "date",
                                date: e.target.value,
                              });
                            }}
                            value={state.date || ""}
                          >
                            {[...Array(31)]?.map((item, indx) => {
                              return (
                                <MenuItem key={indx} value={++indx}>
                                  {indx}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>

                        <FormControl sx={{ mb: 4, mr: 2 }} fullWidth>
                          <InputLabel sx={{ left: "-13px" }}>Month</InputLabel>
                          <Select
                            variant="standard"
                            onChange={(e) => {
                              dispatch({
                                type: "month",
                                month: e.target.value,
                              });
                            }}
                            value={state.month || "January"}
                          >
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl sx={{ mr: 2, mb: 4 }} fullWidth>
                          <InputLabel sx={{ left: "-13px" }}>Year</InputLabel>

                          <Select
                            variant="standard"
                            value={state.year || 2021}
                            onChange={(e) => {
                              dispatch({
                                type: "year",
                                year: e.target.value,
                              });
                            }}
                          >
                            {[...Array(70)]?.map((value, i) => {
                              return (
                                <MenuItem key={i} value={1971 + i}>
                                  {1971 + i}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        onChange={(e) => {
                          dispatch({
                            type: "address",
                            address: e.target.value,
                          });
                        }}
                        value={state.address || ""}
                        type="text"
                        placeholder="Home Address"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ mb: 4, minWidth: 120 }}
                      >
                        <InputLabel>Country</InputLabel>
                        {
                          <Select
                            variant="standard"
                            value={`${state.countryId}` || ""}
                            onChange={(e) => {
                              dispatch({
                                type: "countryId",
                                countryId: e.target.value,
                              });
                            }}
                          >
                            {state.countries?.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item?.id}>
                                  {item?.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        }
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        onChange={(e) => {
                          dispatch({
                            type: "city",
                            city: e.target.value,
                          });
                        }}
                        value={state.city || ""}
                        type="text"
                        placeholder="City"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        onChange={(e) => {
                          dispatch({
                            type: "postalCode",
                            postalCode: e.target.value,
                          });
                        }}
                        value={state.postalCode || ""}
                        type="number"
                        placeholder="ZIP Code"
                      />
                    </Grid>
                  </Grid>

                  <Grid mt={2} item xs={12} sm={12}>
                    <textarea
                      value={state.shortBio || ""}
                      rows={7}
                      placeholder="The name of your institution"
                      style={{
                        width: "100%",
                        background: "transparent",
                        color: "white",
                        lineHeight: 1.5,
                        fontSize: "15px",
                        fontFamily: "Poppins",
                      }}
                      onChange={(e) => {
                        dispatch({
                          type: "shortBio",
                          shortBio: e.target.value,
                        });
                      }}
                    ></textarea>
                  </Grid>

                  <Grid mt={1} container spacing={4}>
                    <Grid item mb={1} xs={6} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        onChange={(e) =>
                          dispatch({
                            type: "education",
                            education: e.target.value,
                          })
                        }
                        type="text"
                        value={state.education || ""}
                        placeholder="Educational Institute"
                      />
                      <Box>
                        <textarea
                          placeholder="Write short description about what you study"
                          value={state.educationAbout || ""}
                          rows={7}
                          style={{
                            width: "100%",
                            background: "transparent",
                            color: "white",
                            lineHeight: 1.5,
                            fontSize: "15px",
                            fontFamily: "Poppins",
                          }}
                          onChange={(e) => {
                            dispatch({
                              type: "educationAbout",
                              educationAbout: e.target.value,
                            });
                          }}
                        ></textarea>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        value={state.work || ""}
                        onChange={(e) =>
                          dispatch({
                            type: "work",
                            work: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Working Industry"
                      />

                      <Box>
                        <textarea
                          placeholder="Write short description about what do you work"
                          value={state.workAbout || ""}
                          rows={7}
                          style={{
                            width: "100%",
                            background: "transparent",
                            color: "white",
                            lineHeight: 1.5,
                            fontSize: "15px",
                            fontFamily: "Poppins",
                          }}
                          onChange={(e) => {
                            dispatch({
                              type: "workAbout",
                              workAbout: e.target.value,
                            });
                          }}
                        ></textarea>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        sx={{ mb: 4 }}
                        variant="standard"
                        color="primary"
                        fullWidth
                        value={state.skills || ""}
                        onChange={(e) =>
                          dispatch({
                            type: "skills",
                            skills: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="What are your main skills?"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button
                    href={`/user/${currentUser.username || currentUser.uuId}`}
                    type="submit"
                    variant="contained"
                    startIcon={<Cancel />}
                    color="error"
                  >
                    Cancle
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Box>
        </Grid>
      </Grid>
    )
  );
};

export default EditProfile;
