import axios from "axios";
import moment from "moment";
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
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
  Fade,
  Grow,
  Paper,
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
import { SocketContext } from "../../../Contexts/Socket";
import Typing from "../../../Components/Typing";
import { Picker } from "emoji-mart";
const Messenger = ({ user, main, mainmenu, width, height }) => {
    const { enqueueSnackbar } = useSnackbar();
  const socket = useContext(SocketContext);
  const [currentChat, setCurrentChat] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [state, dispatch] = useContext(MessengerContext);
  const [typing, setTyping] = useState(false);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNewMessage((prev) => prev + emoji);
  };

  useEffect(() => {
    socket.on("typing", (typerUser) => {
      if (typerUser === user.uuId) {
        setTyping(true);
      }
    });

    if (typing) {
      setTimeout(() => {
        setTyping(false);
      }, 3000);
    }
  }, [socket, typing, user.uuId]);

  const handleTyping = () => {
    socket.emit("imtyping", { emitTo: user.uuId });
  };
  
  const fetch = useCallback(async () => {
    if (!main) {
      const res = await axios.get("/messages/conversation/", {
        params: {
          uuId1: user?.uuId + currentUser?.uuId,
          uuId2: currentUser?.uuId + user?.uuId,
        },
      });

      setCurrentChat(res.data.currentChat);
      setConversations(res.data.conversations);
    } else {
      const res = await axios.get(window.location.pathname);

      setCurrentChat(res.data.inbox);
      setConversations(res.data.messages);
    }
  }, [currentUser?.uuId, main, user?.uuId]);


  useEffect(() => {
    fetch();
  }, [fetch]);

  const SendNewMessage = (e) => {
    e.preventDefault();

    if (currentChat?.length === 0) {
      socket.emit(
        "veryFirstMessage",
        {
          emitTo: user?.uuId,
          inboxData: {
            uuId: currentUser.uuId + user.uuId,
            userId: user?.id,
            ownerId: currentUser?.id,
          },
          messageData: {
            uuId: currentUser.uuId + user.uuId,
            userId: currentUser?.id,
            text: newMessage,
          },
        },
        (response) => {
          fetch();
        }
      );

      setNewMessage("");
    } else {
      socket.emit(
        "newMessage",
        {
          emitTo: user?.uuId,
          data: {
            userId: currentUser?.id,
            text: newMessage,
            uuId: currentChat?.uuId,
          },
        },
        (response) => {
          setConversations((prev) => prev.concat(response));
        }
      );
    }

    setNewMessage("");
  };

  useEffect(() => {
    socket?.on("sendMessage", (payload) => {
      fetch();
    });
  }, [fetch, socket]);

  useEffect(() => {
    socket?.on("VeryFirstSendMessage", (payload) => {
      fetch();
    });
  }, [fetch, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const handleCloseMessenger = (user) => {
    const filterFriends = state.friends.filter(
      (friend) => friend.uuId !== user?.uuId
    );
    dispatch({ type: "CLOSE_MESSENGER", payload: filterFriends });
  };

  useEffect(() => {
    socket.emit("joinChatRoom", currentChat?.uuId);
  }, [currentChat?.uuId, socket]);

  let displayAvatar = true;
  let friendAvatarShow = true;

  return (
    <Card
      elevation={3}
      sx={{
        boxShadow: 2,
        bgcolor: "background.paper",
        width: width || 350,
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
          p: "5px 10px",
        }}
        titleTypographyProps={{ sx: { p: 0, lineHeight: "20px" } }}
        avatar={<CustomAvatar user={user} />}
        title={<UserName user={user} />}
        subheader={user?.designation}
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
            {!mainmenu ? (
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
            ) : (
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
            )}
          </React.Fragment>
        }
      />

      <CardContent
        sx={{
          border: "1px solid #2a2b2c",
          bgcolor: "background.default",
          height: height || 350,
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
                {chatItem?.userId === currentUser?.id ? (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Box
                        sx={{
                          wordBreak: "break-word",
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
                        {chatItem?.text}
                      </Box>
                    </Box>

                    <Box
                      variant="span"
                      sx={{ fontSize: 12, float: "left", mt: 2 }}
                    >
                      {moment(chatItem?.createdAt).fromNow()}{" "}
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
      </CardContent>

      <CardActions sx={{ p: 1, position: "relative" }}>
        <Typing
          open={typing}
          sx={{ position: "absolute", top: "-18px", left: "8px" }}
        />

        <Box
          sx={{
            color: "white",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CameraAlt onClick={()=>enqueueSnackbar('Option Coming Sooon',{variant:'error'})} sx={{ mr: 2 }} color="white" />
          <InsertEmoticon
            onClick={() => setShowEmoji(!showEmoji)}
            sx={{ mr: 2 }}
            color="white"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            onFocus={() => setShowEmoji(false)}
            onChange={(e) => handleTyping() + setNewMessage(e.target.value)}
            variant="standard"
            placeholder="Type your message here..."
            type="text"
            fullWidth
            autoFocus
            value={newMessage}
          />
        </Box>
        {showEmoji && (
          <Paper sx={{ position: "absolute", bottom: 50, left: 0 }}>
            <Picker
              emojiSize={32}
              html={true}
              onSelect={addEmoji}
              showSkinTones={false}
              title="Pick an Emoji"
              showPreview={false}
              useButton={false}
              style={{
                background: "#00000080",
                width: "100%",
                borderRadius: "0",
                border: "none",
              }}
              theme="dark"
              set="facebook"
              i18n={{
                search: "Search",
                categories: { search: "Search", recent: "Recents" },
              }}
            />
          </Paper>
        )}
        <Box>
          <IconButton
            sx={{ padding: 0, m: 0, color: "text.primary" }}
            onClick={(e) => SendNewMessage(e) + setShowEmoji(false)}
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
