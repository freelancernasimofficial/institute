import axios from "axios";
import moment from "moment";
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import {
  Grid,
  Avatar,
  Typography,
  Fab,
  Paper,
  Button,
  TableCell,
  TableRow,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  TextField,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  AttachFile,
  Call,
  Camera,
  CameraAlt,
  FileUpload,
  InsertEmoticon,
  MoreVert,
  Send,
  Upload,
  Videocam,
} from "@mui/icons-material";
import { UserContext } from "../../Contexts/AuthContext";
import { SocketContext } from "../../Contexts/Socket";
import PageLoader from "../../Components/PageLoader";

const Conversations = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messagesList, setMessagesList] = useState(null);
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [winWidth, setWinWidth] = useState("100%");
  const [winHeight, setWinHeight] = useState(300);
  const [typing, setTyping] = useState(false);
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const socket = useContext(SocketContext);





  const fetchMessages = async () => {
    const response = await axios.get(window.location.pathname);
    setMessagesList(response.data.messages);
    setCurrentChat(response.data.inbox);
  }

  useEffect(() => {
     const fetchMessages = async () => {
       const response = await axios.get(window.location.pathname);
       setMessagesList(response.data.messages);
       setCurrentChat(response.data.inbox);
     };
    fetchMessages()
  }, [history.location.pathname]);

  useEffect(() => {
    setWinHeight(window.innerHeight - 150);
    window.addEventListener("resize", (e) => {
      setWinHeight(window.innerHeight - 150);
    });
    return () => {
      setWinHeight(0);
    };
  }, []);

  const SendNewMessage = (e) => {
    e.preventDefault();
    const emitTo =
      currentChat.ownerId === currentUser?.uuId
        ? currentChat.User?.uuId
        : currentChat.owner?.uuId;

    socket.emit("newMessage", {
      emitTo: emitTo,
      personalRoom:currentUser?.uuId,
      data: {
        uuId: currentChat?.uuId,
        userId: currentUser.id,
        text: newMessage,
      },
    });
    setNewMessage("");
    // fetchMessages();
  };

  useEffect(() => {
    socket?.on("sendMessage", (payload) => {
         const fetchMessages = async () => {
           const response = await axios.get(window.location.pathname);
           setMessagesList(response.data.messages);
           setCurrentChat(response.data.inbox);
         };
      fetchMessages()
    });
  }, [messagesList, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  let displayAvatar = true;
  let friendAvatarShow = true;

  useEffect(() => {
    socket.emit("joinChatRoom", currentChat?.uuId);
  
  }, [currentChat?.uuId, socket]);
if (!currentChat || !messagesList) return <PageLoader/>
  return (
    <Card
      elevation={1}
      sx={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: winHeight,
      }}
    >
      <CardHeader
        sx={{
          top: 0,
          position: "absolute",
          width: "100%",
          zIndex: 10,
          borderBottom: "1px solid",
          borderColor: "background.paper",
          bgcolor: "#242526",
        }}
        avatar={
          currentChat?.userId === currentUser.id
            ? (currentChat?.owner?.avatar && (
                <Avatar src={currentChat?.owner?.avatar} />
              )) || (
                <Avatar sx={{ bgcolor: "secondary.main", color: "white" }}>
                  {currentChat?.owner?.firstName?.substr(0, 1)}
                </Avatar>
              )
            : (currentChat?.User?.avatar && (
                <Avatar src={currentChat?.User?.avatar} />
              )) || (
                <Avatar sx={{ bgcolor: "info.main", color: "white" }}>
                  {currentChat?.User?.firstName?.substr(0, 1)}
                </Avatar>
              )
        }
        title={
          currentChat?.userId === currentUser.id ? (
            <Link
              to={`/user/${
                currentChat?.owner?.username || currentChat?.owner?.uuId
              }`}
            >
              {currentChat?.owner?.firstName +
                " " +
                currentChat?.owner?.lastName}
            </Link>
          ) : (
            <Link
              to={`/user/${
                currentChat?.User?.username || currentChat?.User?.uuId
              }`}
            >
              {currentChat?.User?.firstName + " " + currentChat?.User?.lastName}
            </Link>
          )
        }
        subheader="Last seen 1 minute ago"
        subheaderTypographyProps={{ fontSize: "13px !important" }}
        action={
          <>
            <Fab
              sx={{
                boxShadow: "none",
                bgcolor: "transparent",
                color: "white",
                "&:hover": { bgcolor: "transparent", color: "primary.main" },
              }}
              variant="string"
              color="text.white"
              size="small"
            >
              <Call />
            </Fab>
            <Fab
              sx={{
                boxShadow: "none",
                bgcolor: "transparent",
                color: "white",
                "&:hover": { bgcolor: "transparent", color: "primary.main" },
              }}
              variant="string"
              color="text.white"
              size="small"
            >
              <Videocam />
            </Fab>
            <Fab
              sx={{
                boxShadow: "none",
                bgcolor: "transparent",
                color: "white",
                "&:hover": { bgcolor: "transparent", color: "primary.main" },
              }}
              variant="string"
              color="text.white"
              size="small"
            >
              <MoreVert />
            </Fab>
          </>
        }
      />

      <CardContent
        sx={{
          height: winHeight - 150,
          top: "50%",
          position: "absolute",
          width: "100%",
          transform: "translateY(-50%)",
          overflow: "auto",
        }}
      >
        {messagesList &&
          messagesList?.map((chatItem, key) => {
            return (
              <Box
                key={key}
                style={{ width: "100%", display: "block", overflow: "hidden" }}
              >
                {chatItem?.userId === currentUser.id ? (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Box
                        sx={{
                          "&:before": {
                            content: '""',
                            borderRight: "15px solid transparent",
                            borderBottom: "16px solid #36363600",
                            borderRightColor: "primary.main",
                            position: "absolute",
                            top: "3px",
                            transform: "rotate(45deg)",
                            right: "-5px",
                            width: 0,
                            height: "auto",
                          },
                          color: "text.white",
                          bgcolor: "primary.main",
                          padding: "10px",
                          borderRadius: "4px",
                          maxWidth: "50%",
                          marginRight: "20px",
                          marginTop: "15px",
                          position: "relative",
                        }}
                      >
                        {chatItem.text}
                      </Box>

                      {displayAvatar === true ? (
                        <Box>
                          {chatItem?.User?.avatar ? (
                            <Avatar src={chatItem?.User?.avatar} />
                          ) : (
                            <Avatar
                              sx={{ bgcolor: "secondary.main", color: "white" }}
                            >
                              {chatItem?.User?.firstName?.substr(0, 1)}
                            </Avatar>
                          )}
                        </Box>
                      ) : (
                        <Avatar
                          sx={{
                            visibility: "hidden !important",
                            bgcolor: "secondary.main",
                            color: "text.primary",
                          }}
                        >
                          {chatItem?.User?.firstName?.substr(0, 1)}
                        </Avatar>
                      )}
                    </Box>

                    {(displayAvatar = false)}
                    {(friendAvatarShow = true)}

                    <Box sx={{ fontSize: 12, float: "right", mt: 2 }}>
                      {moment(chatItem.createdAt).fromNow()}
                      <span> &nbsp;Seen</span>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                      {friendAvatarShow === true ? (
                        currentChat?.owner?.avatar ? (
                          <Avatar src={currentChat?.owner?.avatar} />
                        ) : (
                          <Avatar
                            sx={{
                              bgcolor: "secondary.main",
                              color: "text.primary",
                            }}
                          >
                            {currentChat?.owner?.firstName?.substr(0, 1)}
                          </Avatar>
                        )
                      ) : (
                        <Avatar
                          sx={{
                            visibility: "hidden !important",
                            bgcolor: "secondary.main",
                            color: "text.primary",
                          }}
                        >
                          {currentChat?.owner?.firstName?.substr(0, 1)}
                        </Avatar>
                      )}

                      <Box
                        sx={{
                          "&:before": {
                            content: '""',
                            borderLeft: "15px solid transparent",
                            borderBottom: "16px solid #36363600",
                            borderLeftColor: "secondary.main",
                            position: "absolute",
                            top: "3px",
                            transform: "rotate(-45deg)",
                            left: "-5px",
                            width: 0,
                            height: "auto",
                          },
                          color: "text.primary",
                          bgcolor: "secondary.main",
                          padding: "10px",
                          borderRadius: "4px",
                          maxWidth: "50%",
                          marginLeft: "20px",
                          marginTop: "15px",
                          position: "relative",
                        }}
                      >
                        {chatItem.text}
                      </Box>
                    </Box>

                    <Box
                      variant="span"
                      sx={{ fontSize: 12, float: "left", mt: 2 }}
                    >
                      {moment(chatItem.createdAt).fromNow()}{" "}
                    </Box>

                    {(friendAvatarShow = false)}
                    {(displayAvatar = true)}
                  </>
                )}
              </Box>
            );
          })}
        <div ref={scrollRef}></div>

        <div
          className={`spinner4 chatTypeEffect ${
            typing === true ? "animated fadeIn" : "animated fadeOut"
          }`}
        >
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </CardContent>

      <CardActions
        sx={{ position: "absolute", bottom: 0, zIndex: 10, width: "100%" }}
      >
        <Paper
          sx={{
            pt: 2,
            boxShadow: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "end",
            borderTop: "1px solid",
            borderColor: "background.paper",
          }}
        >
          <TextField
            onChange={(e) => setNewMessage(e.target.value)}
            variant="standard"
            placeholder="Type your message here..."
            type="text"
            fullWidth
            autoFocus
            value={newMessage}
          />
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                color: "white",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <CameraAlt sx={{ mr: 2 }} color="white" />
              <InsertEmoticon sx={{ mr: 2 }} color="white" />
              <AttachFile sx={{ mr: 2 }} color="white" />
            </Box>
            <Button
              sx={{ padding: 1, ml: 2 }}
              onClick={SendNewMessage}
              variant="contained"
              color="primary"
            >
              <Send />
            </Button>
          </Box>
        </Paper>
      </CardActions>
    </Card>
  );
};

export default Conversations;
