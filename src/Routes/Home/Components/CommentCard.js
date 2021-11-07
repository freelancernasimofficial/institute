import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React, { useReducer, useContext, useEffect, useRef, useState } from "react";
import { Paper, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { InsertEmoticonOutlined, Send } from "@mui/icons-material";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../../../Contexts/AuthContext";
import axios from "axios";
import { commentReducer, initialComments } from "../../../Reducers/PostReducer";
import { useSnackbar } from "notistack";
import { FeedContext } from "./FeedCard";
import PageLoader from "../../../Components/PageLoader";
import { Picker } from "emoji-mart";

const CommentCard = ({ postId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(commentReducer, initialComments);
  const { postState, postDispatch } = useContext(FeedContext);
  const { currentUser } = useContext(UserContext);
  const scrollToField = useRef(null);
  const cardRef = useRef(null);
const [showEmoji, setShowEmoji] = useState(false);
const [showEmoji2, setShowEmoji2] = useState(false);
  const scrollToReplies = () => {
    scrollToField?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  const scrollToCard = () => {
    cardRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const reFetch = async () => {
    try {
      const loadComments = await axios.get("/posts/comments/get", {
        params: { postId },
      });
      dispatch({ type: "LOAD_COMMENTS", payload: loadComments.data });
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };

  const addComment = async () => {
    try {
      const addComment = await axios.post(`/posts/comments/add`, {
        postId: postId,
        text: state.commentInput,
        image: null,
      });

      const response = Object.assign({ User: currentUser }, addComment.data);
      postDispatch({ type: "NEW_COMMENT",payload:{TotalComments: ++postState.TotalComments}});
      dispatch({ type: "NEW_COMMENT", payload: response });
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };

  const updateComment = async (commentId, image = null) => {
    try {
      const editComment = await axios.put(`/posts/comments`, {
        commentId: commentId,
        text: state.commentInput,
      });
      dispatch({ type: "UPDATE_COMMENT", payload: editComment.data });
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const removeComment = await axios.delete(`/posts/comments`, {
        params: { commentId: commentId },
      });
       postDispatch({
         type: "NEW_COMMENT",
         payload: { TotalComments: --postState.TotalComments },
       });
      dispatch({ type: "DELETE_COMMENT", payload: true });
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };

  const getReplies = async (commentId) => {
    try {
      const loadReplies = await axios.get("/posts/comments/get/replies", {
        params: { postId, commentId },
      });
      dispatch({ type: "LOAD_REPLIES", payload: loadReplies.data });
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };

  const addReplies = async (commentId) => {
    try {
      const addReply = await axios.post("/posts/comments/reply/add", {
        postId,
        commentId,
        offset: state.replyOffset,
        text: state.replyInput,
      });
      postDispatch({
        type: "NEW_COMMENT",
        payload: { TotalComments: ++postState.TotalComments },
      });
      dispatch({ type: "CLEAN_INPUT" });
      reFetch();
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };
  const deleteReply = async (postId, commentId) => {
    try {
      const removeReply = await axios.delete("/posts/comments/replies/delete", {
        params: {
          commentId,
        },
      });
       postDispatch({
         type: "NEW_COMMENT",
         payload: { TotalComments: --postState.TotalComments },
       });
      dispatch({ type: "DELETE_REPLY", payload: removeReply.data });
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };

  const updateReply = async (commentId) => {
    try {
      const replyUpdate = await axios.put("/posts/comments/replies/update", {
        commentId,
        text: state.replyInput,
        offset: state.replyOffset,
      });
      dispatch({ type: "UPDATE_REPLY", payload: replyUpdate.data });
    } catch (error) {
      enqueueSnackbar("Server Error!", { variant: "warning" });
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const loadComments = await axios.get("/posts/comments/get", {
          params: { postId },
        });
        dispatch({ type: "LOAD_COMMENTS", payload: loadComments.data });
      } catch (error) {
        enqueueSnackbar("Server Error!", { variant: "warning" });
      }
    };

    fetchComments();

    return () => {
      dispatch({ type: "CLEAN" });
    };
  }, [enqueueSnackbar, postId]);


     
     const addEmoji = (e) => {
       let sym = e.unified.split("-");
       let codesArray = [];
       sym.forEach((el) => codesArray.push("0x" + el));
       let emoji = String.fromCodePoint(...codesArray);
          dispatch({
            type: "ONCHANGE_REPLY",
            payload: state.replyInput+emoji,
          });
     };
  
      const addEmoji2 = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
       dispatch({
         type: "ONCHANGE_COMMENT",
         payload: state.commentInput + emoji,
       });
      };

  if (state.length <0) return <PageLoader/>
    return (
      <Paper elevation={1}>
        <Box ref={cardRef}></Box>
        <Divider light={true} variant="fullWidth" />
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            p: "7px 15px",
          }}
        >
          <InputBase
            onFocus={() => setShowEmoji2(false)}
            value={state.commentInput}
            fullWidth={true}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_COMMENT", payload: e.target.value })
            }
            endAdornment={
              <React.Fragment>
                <InsertEmoticonOutlined
                  sx={{
                    mr: 2,
                    color: showEmoji2 ? "primary.light" : "text.primary",
                    cursor: "pointer",
                    "&:hover": {
                      color: "primary.light",
                    },
                  }}
                  onClick={() =>
                    showEmoji2 ? setShowEmoji2(false) : setShowEmoji2(true)
                  }
                />
                <IconButton onClick={() => addComment()}>
                  <Send />
                </IconButton>
              </React.Fragment>
            }
            startAdornment={
              <React.Fragment>
                {currentUser?.avatar ? (
                  <Avatar
                    sx={{ mr: 1, width: 35, height: 35 }}
                    alt="emanush"
                    src={currentUser?.avatar}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      mr: 1,
                      color: "text.primary",
                      bgcolor: "secondary.main",
                    }}
                  >
                    {currentUser?.firstName.substr(0, 1)}
                  </Avatar>
                )}
              </React.Fragment>
            }
            placeholder="Write comment"
          />
        </Box>
        {showEmoji2 && (
          <Picker
            emojiSize={32}
            onSelect={addEmoji2}
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
              categories: {
                search: "Search",
                recent: "Recents",
              },
            }}
          />
        )}
        <List>
          {state?.comments?.map((comment, key) => {
            return (
              <ListItem
                onClick={(e) => e.stopPropagation()}
                key={key}
                sx={{ display: "flex", width: "100%" }}
              >
                <ListItemText
                  disableTypography={true}
                  sx={{
                    p: 1,
                    bgcolor: "none",
                    borderRadius: "3px",
                  }}
                  primary={
                    <Box sx={{ width: "100%" }}>
                      <Box
                        component="div"
                        sx={{
                          display: "block",
                          width: "100%",
                          float: "right",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "baseline",
                            justifyContent: "flex-start",
                          }}
                        >
                          <ListItemAvatar>
                            {comment?.User?.avatar ? (
                              <Avatar
                                sx={{ width: 35, height: 35 }}
                                src={comment?.User?.avatar}
                              />
                            ) : (
                              <Avatar
                                sx={{
                                  height: 35,
                                  width: 35,
                                  bgcolor: "primary.main",
                                  color: "text.primary",
                                }}
                              >
                                {comment?.User?.firstName.substr(0, 1)}
                              </Avatar>
                            )}
                          </ListItemAvatar>
                          <Box sx={{ width: "100%", float: "left" }}>
                            <Box
                              sx={{
                                width: "100%",
                                display: "block",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                bgcolor: "background.default",
                                p: 2,
                                borderRadius: "3px",
                              }}
                            >
                              <Box>
                                <Link to="#">
                                  <Typography component="h6" variant="h6">
                                    {comment?.User?.firstName +
                                      " " +
                                      comment?.User?.lastName}
                                  </Typography>
                                </Link>
                              </Box>
                              <Typography component="span" variant="subtitle1">
                                {comment?.text}
                              </Typography>
                              <Box
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Typography
                                  component="span"
                                  sx={{
                                    color: "primary.light",
                                    cursor: "pointer",
                                    "&:hover": {
                                      color: "primary.light",
                                      textDecoration: "underline",
                                    },
                                  }}
                                  variant="subtitle1"
                                >
                                  Like
                                </Typography>
                                <Typography
                                  onClick={() =>
                                    dispatch({
                                      type: "TARGET_COMMENT",
                                      payload: comment,
                                    })
                                  }
                                  component="span"
                                  sx={{
                                    color: "primary.light",
                                    cursor: "pointer",
                                    m: "0 10px",
                                    "&:hover": {
                                      color: "primary.light",
                                      textDecoration: "underline",
                                    },
                                  }}
                                  variant="subtitle1"
                                >
                                  Reply
                                </Typography>
                                <Typography
                                  sx={{ mt: 0.4 }}
                                  component="span"
                                  variant="subtitle2"
                                >
                                  {moment(comment?.createdAt).fromNow()}
                                </Typography>
                              </Box>
                            </Box>
                            {state?.targetComment &&
                            Number(state?.targetComment.id) ===
                              Number(comment.id) ? (
                              <Box sx={{ width: "100%" }}>
                                <Box
                                  component="form"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: "7px 15px",
                                  }}
                                >
                                  <InputBase
                                    onFocus={() => setShowEmoji(false)}
                                    ref={scrollToReplies}
                                    onChange={(e) =>
                                      dispatch({
                                        type: "ONCHANGE_REPLY",
                                        payload: e.target.value,
                                      })
                                    }
                                    fullWidth={true}
                                    endAdornment={
                                      <React.Fragment>
                                        <InsertEmoticonOutlined
                                          sx={{
                                            mr: 2,
                                            color: showEmoji
                                              ? "primary.light"
                                              : "text.primary",
                                            cursor: "pointer",
                                            "&:hover": {
                                              color: "primary.light",
                                            },
                                          }}
                                          onClick={() =>
                                            showEmoji
                                              ? setShowEmoji(false)
                                              : setShowEmoji(true)
                                          }
                                        />
                                        <IconButton
                                          onClick={(e) =>
                                            addReplies(comment.id)
                                          }
                                        >
                                          <Send />
                                        </IconButton>
                                      </React.Fragment>
                                    }
                                    startAdornment={
                                      <React.Fragment>
                                        {currentUser?.avatar ? (
                                          <Avatar
                                            sx={{
                                              width: 32,
                                              height: 32,
                                              mr: 1,
                                            }}
                                            src={currentUser?.avatar}
                                          />
                                        ) : (
                                          <Avatar
                                            sx={{
                                              height: "32px",
                                              width: "32px",
                                              bgcolor: "primary.main",
                                              color: "text.primary",
                                              mr: 1,
                                            }}
                                          >
                                            {currentUser.firstName.substr(0, 1)}
                                          </Avatar>
                                        )}
                                      </React.Fragment>
                                    }
                                    placeholder="Reply"
                                    value={state.replyInput}
                                  />
                                </Box>
                                {showEmoji && (
                                  <Picker
                                    emojiSize={32}
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
                                      categories: {
                                        search: "Search",
                                        recent: "Recents",
                                      },
                                    }}
                                  />
                                )}
                              </Box>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        component="div"
                        sx={{
                          float: "right",
                          width: "100%",
                          paddingLeft: "60px",
                        }}
                        className="subComent"
                      >
                        <List
                          sx={{
                            width: "auto",

                            overflow: "hidden",
                            float: "left",
                          }}
                        >
                          {comment?.CommentReplies?.map((reply, key) => {
                            return (
                              <ListItem
                                key={key}
                                sx={{
                                  m: 0,
                                  p: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <ListItemAvatar>
                                    {reply?.User?.avatar ? (
                                      <Avatar
                                        sx={{ width: 32, height: 32 }}
                                        src={reply?.User?.avatar}
                                      />
                                    ) : (
                                      <Avatar
                                        sx={{
                                          height: "32px",
                                          width: "32px",
                                          bgcolor: "primary.main",
                                          color: "text.primary",
                                        }}
                                      >
                                        {reply?.User?.firstName.substr(0, 1)}
                                      </Avatar>
                                    )}
                                  </ListItemAvatar>
                                  <Box>
                                    <ListItemText
                                      disableTypography
                                      sx={{
                                        p: 2,
                                        bgcolor: "background.default",
                                        borderRadius: "3px",
                                        mt: 2,
                                      }}
                                      primary={
                                        <React.Fragment>
                                          <Link to="#">
                                            <Typography
                                              component="h6"
                                              variant="h6"
                                            >
                                              {reply?.User?.firstName +
                                                " " +
                                                reply?.User?.lastName}
                                            </Typography>
                                          </Link>
                                          <Typography
                                            component="div"
                                            variant="subtitle1"
                                          >
                                            {reply?.text}
                                          </Typography>
                                          <Box
                                            component="div"
                                            sx={{
                                              width: "100%",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "flex-start",
                                            }}
                                          >
                                            <Typography
                                              component="span"
                                              sx={{
                                                color: "primary.light",
                                                cursor: "pointer",
                                                "&:hover": {
                                                  color: "primary.light",
                                                  textDecoration: "underline",
                                                },
                                              }}
                                              variant="subtitle1"
                                            >
                                              Like
                                            </Typography>
                                            <Typography
                                              onClick={(e) =>
                                                dispatch({
                                                  type: "REPLY_TARGET",
                                                  payload: reply,
                                                })
                                              }
                                              component="span"
                                              sx={{
                                                color: "primary.light",
                                                cursor: "pointer",
                                                m: "0 10px",
                                                "&:hover": {
                                                  color: "primary.light",
                                                  textDecoration: "underline",
                                                },
                                              }}
                                              variant="subtitle1"
                                            >
                                              Reply
                                            </Typography>
                                            <Typography
                                              sx={{ mt: 0.4 }}
                                              component="span"
                                              variant="subtitle2"
                                            >
                                              {moment(
                                                reply?.createdAt
                                              ).fromNow()}
                                            </Typography>
                                          </Box>
                                        </React.Fragment>
                                      }
                                    />
                                    {state.replyTargetComment.id === reply.id &&
                                    state.replyTargetComment.commentId ===
                                      comment.id ? (
                                      <Box
                                        component="form"
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          p: "7px 15px",
                                        }}
                                      >
                                        <InputBase
                                          ref={scrollToReplies}
                                          onChange={(e) =>
                                            dispatch({
                                              type: "ONCHANGE_REPLY",
                                              payload: e.target.value,
                                            })
                                          }
                                          fullWidth={true}
                                          endAdornment={
                                            <React.Fragment>
                                              <IconButton
                                                onClick={(e) =>
                                                  addReplies(comment.id)
                                                }
                                              >
                                                <Send />
                                              </IconButton>
                                            </React.Fragment>
                                          }
                                          startAdornment={
                                            <React.Fragment>
                                              {currentUser?.avatar ? (
                                                <Avatar
                                                  sx={{
                                                    width: 32,
                                                    height: 32,
                                                    mr: 1,
                                                  }}
                                                  src={currentUser?.avatar}
                                                />
                                              ) : (
                                                <Avatar
                                                  sx={{
                                                    height: "32px",
                                                    width: "32px",
                                                    bgcolor: "primary.main",
                                                    color: "text.primary",
                                                    mr: 1,
                                                  }}
                                                >
                                                  {currentUser.firstName.substr(
                                                    0,
                                                    1
                                                  )}
                                                </Avatar>
                                              )}
                                            </React.Fragment>
                                          }
                                          placeholder="Reply"
                                          value={state.replyInput}
                                        />
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                  </Box>
                                </Box>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
          <Typography
            variant="h6"
            component="div"
            sx={{ padding: "15px 15px 10px 15px" }}
            onClick={scrollToCard}
          >
            Write a comment...
          </Typography>
        </List>
      </Paper>
    );
};

export default CommentCard;
