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
  Avatar,
  Fab,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Call,
  CameraAlt,
  CloseOutlined,
  InsertEmoticon,
  MoreVert,
  Send,
  Videocam,
} from "@mui/icons-material";
import { UserContext } from "../../../Contexts/AuthContext";
import CustomAvatar from "../../../Components/CustomAvatar";
import UserName from "../../../Components/UserName";
import { MessengerContext } from "../../../Contexts/MessengerProvider";
import useFetch from "../../../Hooks/useFetch";
import { SocketContext } from "../../../Contexts/Socket";

const Messenger = ({ user }) => {
  const socket = useContext(SocketContext);
  const [currentChat, setCurrentChat] = useState([]);
  const [conversations, setConversations] = useState([]);
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [state, dispatch] = useContext(MessengerContext);

  const fetch = useCallback(async () => {
    const res = await axios.get("/messages/conversation/", {
      params: {
        uuId1: user.uuId + currentUser.uuId,
        uuId2: currentUser.uuId + user.uuId,
      },
    });

    setCurrentChat(res.data.currentChat);
    setConversations(res.data.conversations);
  }, [currentUser.uuId, user.uuId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const SendNewMessage = (e) => {
    e.preventDefault();

    if (currentChat.length === 0) {
      socket.emit("veryFirstMessage", {
        emitTo: user.uuId,
        personalRoom: currentUser.uuId,
        inboxData: {
          userId: user.id,
          ownerId: currentUser.id,
          uuId: currentUser.uuId + user.uuId,
        },
        messageData: {
          uuId: currentUser.uuId + user.uuId,
          userId: currentUser.id,
          text: newMessage,
        },
      });

      setNewMessage("");
      fetch();
    } else {
      socket.emit("newMessage", {
        emitTo: user.uuId,
        data: {
          uuId: currentChat.uuId,
          userId: currentUser.id,
          text: newMessage,
        },
      });
    }

    setNewMessage("");
    
  };

  useEffect(() => {
    socket?.on("sendMessage", (payload) => {
      // setConversations((prev) => {
      //   return [...prev, ...payload];
      // });


        const fetch =async () => {
          const res = await axios.get("/messages/conversation/", {
            params: {
              uuId1: user.uuId + currentUser.uuId,
              uuId2: currentUser.uuId + user.uuId,
            },
          });

          setCurrentChat(res.data.currentChat);
          setConversations(res.data.conversations);
        }
      fetch()

      
    });

    socket?.on("VeryFirstSendMessage", (payload) => {
      setConversations((prev) => prev.concat(payload.conversations));
      setCurrentChat(payload.currentChat);
    });
  }, [currentUser.uuId, socket, user.uuId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const handleCloseMessenger = (user) => {
    const filterFriends = state.friends.filter(
      (friend) => friend.uuId !== user.uuId
    );
    dispatch({ type: "CLOSE_MESSENGER", payload: filterFriends });
  };


    useEffect(() => {
      socket.emit("joinChatRoom", currentChat.uuId);
    }, [currentChat.uuId, socket]);

  let displayAvatar = true;
  let friendAvatarShow = true;

  return (
    <Card
      elevation={3}
      sx={{
        boxShadow: 2,
        bgcolor: "background.paper",
        width: 350,
        marginBottom: "5px",
        svg: { fontSize: 20 },
        ".MuiCardHeader-action": {
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-end",
          alignSelf: "inherit",
          m: 0,
          button: {
            "&:hover": { color: "info.light" },
            m: 0,
            p: 0,
            width: "inherit",
            height: "inherit",
            minWidth: "inherit",
            minHeight: "inherit",
            ml: 1,
          },
        },
      }}
    >
      <CardHeader
        sx={{
          m: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "3px 10px",
        }}
        titleTypographyProps={{ sx: { p: 0, lineHeight: "20px" } }}
        avatar={<CustomAvatar user={user} />}
        title={<UserName user={user} />}
        subheader={user.designation}
        subheaderTypographyProps={{
          fontSize: "12px !important",
          lineHeight: "18px",
        }}
        action={
          <React.Fragment>
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
              onClick={() => handleCloseMessenger(user)}
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
              <CloseOutlined />
            </Fab>
          </React.Fragment>
        }
      />

      <CardContent
        sx={{
          bgcolor: "background.default",
          height: "350px",
          width: "100%",

          overflow: "auto",
        }}
      >
        {conversations?.length <= 0 ? (
          <Typography
            sx={{
              opacity: 0.5,
              textAlign: "center",
              marginTop: "50%",
              transform: "translateY(-50%)",
            }}
            variant="body1"
            component="div"
          >
            You have no previous messages
          </Typography>
        ) : (
          conversations?.map((chatItem, key) => {
            return (
              <Box
                key={key}
                style={{
                  width: "100%",
                  display: "block",
                  overflow: "hidden",
                }}
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
                          {currentUser?.avatar ? (
                            <Avatar src={currentUser?.avatar} />
                          ) : (
                            <Avatar
                              sx={{
                                bgcolor: "secondary.main",
                                color: "white",
                              }}
                            >
                              {currentUser?.firstName?.substr(0, 1)}
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
                          {currentUser?.firstName?.substr(0, 1)}
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
                        user?.avatar ? (
                          <Avatar src={user?.avatar} />
                        ) : (
                          <Avatar
                            sx={{
                              bgcolor: "secondary.main",
                              color: "text.primary",
                            }}
                          >
                            {user?.firstName?.substr(0, 1)}
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
                          {user?.firstName?.substr(0, 1)}
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
          })
        )}

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

      <CardActions sx={{ p: 1 }}>
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
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            onChange={(e) => setNewMessage(e.target.value)}
            variant="standard"
            placeholder="Type your message here..."
            type="text"
            fullWidth
            autoFocus
            value={newMessage}
          />
        </Box>
        <Box>
          <IconButton
            sx={{ padding: 0, m: 0, color: "text.primary" }}
            onClick={SendNewMessage}
            variant="contained"
            color="primary"
          >
            <Send />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default React.memo(Messenger);
