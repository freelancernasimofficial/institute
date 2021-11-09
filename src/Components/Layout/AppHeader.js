import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  ListItemButton,
  ListItemIcon,
  Paper,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import {
  AccountCircleOutlined,
  EditOutlined,
  ExitToAppOutlined,
  LogoutOutlined,
  Settings,
} from "@mui/icons-material";

import axios from "axios";

import { UserContext } from "../../Contexts/AuthContext";
import Notifications from "./Notifications";
import ChatMessages from "./ChatMessages";
require("dotenv").config();


const AppHeader = () => {
  const [showMessages, setShowMessages] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [chatList, setChatlist] = useState(null);
  const [notifications, setNotification] = useState(null);


  const seenNotifications = (e) => {
    axios
      .get("/notifications", {
        params: {
          isSeen: true,
        },
      })
      .then((res) => {
        setNotification(res.data);
      })
      .catch((error) => {
        setNotification(null);
      });
  };
  const history = useHistory();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      e.stopPropagation();
      setShowMessages(false);
      setShowNotification(false);
      setShowProfile(false);
    });
    return () => {
      setShowMessages(false);
      setShowNotification(false);
      setShowProfile(false);
    };
  }, []);
  const handleLogout = (e) => {
    axios.get('/logout').then((res) => {
      history.push('/login')
    })
  };

  return (
    <React.Fragment>
      <AppBar
        elevation={1}
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "65px",
          justifyContent: "center",
          svg: {
            fontSize: 22,
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="font-bangla"
            sx={{ display: { xs: "block", sm: "block", fontWeight: "600" } }}
          >
            App
          </Typography>
          <Box
            elevation={4}
            ml={3}
            component={Paper}
            sx={{
              boxShadow: 0,
              border: "0px",
              display: { xs: "none", sm: "block" },
            }}
          >
            <TextField
              sx={{
                div: {
                  outline: 0,
                  border: 0,
                  "&::before": { content: "none" },
                },
                padding: "0px 5px",
                bgcolor: "transparent",
              }}
              variant="standard"
              placeholder="Search..."
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfile(false);
                  setShowNotification(false);
                  showMessages === false
                    ? setShowMessages(true)
                    : setShowMessages(false);
                }}
                size="large"
                aria-label="show 4 new mails"
              >
                <Badge
                  badgeContent={
                    chatList?.filter((flCount) => flCount.isSeen === 0).length
                  }
                >
                  <MailIcon />
                </Badge>
              </IconButton>
              <Collapse
                timeout={500}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  overflow: "hidden",
                  position: "absolute",
                  width: "350px",
                  right: 0,
                  top: 57,
                }}
                in={showMessages}
              >
                <Card elevation={4}>
                  <ChatMessages height="400px" />
                  <CardActions
                    sx={{
                      p: 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Link to="/messages">
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        View All Messages
                      </Typography>
                    </Link>
                  </CardActions>
                </Card>
              </Collapse>
            </Box>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMessages(false);
                  setShowProfile(false);
                  seenNotifications(e);
                  showNotification === false
                    ? setShowNotification(true)
                    : setShowNotification(false);
                }}
                size="large"
                aria-label="show new notifications"
              >
                <Badge
                  badgeContent={
                    notifications?.filter((item) => item.isSeen === false)
                      .length
                  }
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Collapse
                onClick={(e) => e.stopPropagation()}
                timeout={500}
                sx={{
                  position: "absolute",
                  width: "350px",
                  right: 0,
                  top: 57,
                }}
                in={showNotification}
              >
                <Card elevation={4}>
                  <CardHeader title="Notifications" />

                  <CardContent
                    sx={{
                      bgcolor: "background.paper",
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                  >
                    <Notifications />
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Link to={`/notifications`}>
                      <Button>View All Notifications</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Collapse>
            </Box>
            <Box
              sx={{
                position: "relative",
                alignItems: "center",
                display: "flex",
                ml: 2,
              }}
            >
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMessages(false);
                  setShowNotification(false);
                  showProfile === false
                    ? setShowProfile(true)
                    : setShowProfile(false);
                }}
                component="div"
              >
                {currentUser?.avatar ? (
                  <Avatar
                    sx={{
                      border: "2px solid",
                      borderColor: "primary.main",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                    alt="user image"
                    src={currentUser?.avatar}
                  />
                ) : (
                  <Avatar
                    sx={{
                      border: "2px solid",
                      borderColor: "text.primary",
                      bgcolor: "primary.main",
                      width: "30px",
                      height: "30px",
                      color: "text.primary",
                      cursor: "pointer",
                      p: "15px",
                    }}
                  >
                    {currentUser?.firstName?.substr(0, 1)}
                  </Avatar>
                )}
              </Box>

              <Collapse
                onClick={(e) => e.stopPropagation()}
                timeout={500}
                sx={{
                  overflow: "hidden",
                  position: "absolute",
                  width: "350px",
                  right: 0,
                  top: 57,
                }}
                in={showProfile}
              >
                <Card elevation={4}>
                  <CardHeader
                    avatar={
                      currentUser?.avatar ? (
                        <Avatar
                          sx={{
                            border: "2px solid",
                            borderColor: "text.primary",
                          }}
                          alt="user image"
                          src={currentUser?.avatar}
                        />
                      ) : (
                        <Avatar
                          sx={{
                            border: "2px solid",
                            borderColor: "text.primary",
                            bgcolor: "primary.main",
                            width: "30px",
                            height: "30px",
                            color: "text.primary",
                            cursor: "pointer",
                            p: "15px",
                          }}
                        >
                          {currentUser?.firstName?.substr(0, 1)}
                        </Avatar>
                      )
                    }
                    title={
                      <Link
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                        to={`/user/${
                          currentUser?.username || currentUser?.uuId
                        }`}
                      >
                        {currentUser?.firstName + " " + currentUser?.lastName}{" "}
                      </Link>
                    }
                    subheader={currentUser?.designation}
                  />

                  <CardContent
                    sx={{
                      m: 0,
                      p: 0,
                      height: "400px",
                      "--webkit-scrollbar:": "none",
                      overflowY: "scroll",
                      a: { color: "text.primary" },
                      bgcolor: "background.paper",
                    }}
                  >
                    <List>
                      <ListItem disablePadding>
                        <Link
                          style={{ display: "block", width: "100%" }}
                          to={`/user/${
                            currentUser?.username || currentUser?.uuId
                          }`}
                        >
                          <ListItemButton>
                            <ListItemIcon>
                              <AccountCircleOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                      <ListItem disablePadding>
                        <Link
                          style={{ display: "block", width: "100%" }}
                          to={`/user/${
                            currentUser?.username || currentUser?.uuId
                          }/edit`}
                        >
                          <ListItemButton>
                            <ListItemIcon>
                              <EditOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Settings />
                          </ListItemIcon>
                          <ListItemText primary="Settings" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding onClick={handleLogout}>
                        <ListItemButton>
                          <ListItemIcon>
                            <LogoutOutlined />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </CardContent>

                  <CardActions
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <Link
                      onClick={(e) => handleLogout() + e.preventDefault()}
                      to="/#"
                    >
                      <Typography
                        align="center"
                        variant="h6"
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          "&:hover": {
                            color: "primary.light",
                          },
                        }}
                      >
                        <ExitToAppOutlined sx={{ mr: 2 }} />
                        Logout
                      </Typography>
                    </Link>
                  </CardActions>
                </Card>
              </Collapse>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default AppHeader;
