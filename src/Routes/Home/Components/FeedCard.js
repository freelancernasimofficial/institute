import React, { useEffect, useReducer, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  CommentOutlined,
  ShareOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import moment from "moment";
import { Box } from "@mui/system";
import FeedCardShared from "./FeedCardShared";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import axios from "axios";
import SharedPostForm from "./SharePostForm";
import PostReducer, { initialPost } from "../../../Reducers/PostReducer";
import PageLoader from "../../../Components/PageLoader";
export const FeedContext = React.createContext();

const FeedCard = ({ post, refetch, maxWidth = "600px" }) => {
  const [state, dispatch] = useReducer(PostReducer, {
    ...initialPost,
    ...post,
  });

  const [sharing, setSharing] = useState(false);

  const handleReact = async () => {
    try {
      const react = await axios.post(`/posts/reaction/`, {
        id: state?.id,
        offset: state?.offset,
      });

      if (react.data.isReacted === true) {
        dispatch({
          type: "REACT",
          payload: {
            isReacted: true,
            TotalReactions: ++state.TotalReactions,
          },
        });
      } else {
        dispatch({
          type: "REACT",
          payload: {
            isReacted: false,
            TotalReactions: --state.TotalReactions,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: { message: "Something is wrong with the server..." },
      });
    }
   
  };

  if (!state) return <PageLoader />;

  return (
    <React.Fragment>
      <FeedContext.Provider
        value={{ postState: state, postDispatch: dispatch }}
      >
        <Card
          sx={{
            overflow: "hidden",
            m: "auto",
            mb: 2,
            maxWidth: maxWidth,
          }}
          elevation={1}
        >
          <CardHeader
            sx={{ backgroundColor: "transparent !important" }}
            avatar={
              state?.User?.avatar ? (
                <Avatar alt="emanush.com" src={state?.User?.avatar} />
              ) : (
                <Avatar
                  sx={{ bgcolor: "secondary.dark", color: "common.white" }}
                  aria-label="recipe"
                >
                  {state?.User?.firstName?.substr(0, 1)}
                </Avatar>
              )
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            titleTypographyProps={{
              sx: { color: "text.primary", a: { color: "text.primary" } },
            }}
            title={
              <React.Fragment>
                <Link
                  to={`/user/${state?.User?.username || state?.User?.uuId}`}
                >
                  {state?.User?.firstName + " " + state?.User?.lastName}
                </Link>
                {state?.SharedPost && (
                  <>
                    <Typography
                      component="span"
                      variant="h6"
                      color="text.secondary"
                    >
                      {" Shared "}
                    </Typography>

                    <Typography
                      sx={{ a: { color: "info.light" } }}
                      variant="h6"
                      component="span"
                    >
                      <Link
                        to={`/user/${
                          state?.SharedPost?.User?.username ||
                          state?.SharedPost?.User?.uuId
                        }`}
                      >
                        {state?.SharedPost?.User?.firstName +
                          " " +
                          state?.SharedPost?.User?.lastName}
                        's
                      </Link>
                    </Typography>

                    <Typography
                      sx={{ a: { color: "text.primary", marginLeft: "5px" } }}
                      component="span"
                      variant="h6"
                    >
                      <Link to={`/posts/${state?.uuId}`}>Post</Link>
                    </Typography>
                  </>
                )}
              </React.Fragment>
            }
            subheader={moment(state?.createdAt).fromNow()}
          />
          <Divider variant="fullWidth" light={true} />

          <CardContent sx={{ bgcolor: "transparent" }}>
            <Typography variant="body2">{state?.text}</Typography>
            {state?.sharedPostId !== null ? (
              <FeedCardShared sharedPost={state?.SharedPost} />
            ) : (
              " "
            )}
          </CardContent>
          {state?.sharedPostId === null && state?.thumbnail && (
            <CardMedia
              component="img"
              image={state?.thumbnail}
              alt="thumbnail"
            />
          )}
          <Box
            component="div"
            sx={{
              p: "20px 15px 5px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {state?.TotalReactions > 0 ? (
                <React.Fragment>
                  <Typography
                    sx={{ ml: 1 }}
                    color="text.secondary"
                    variant="subtitle1"
                  >
                    {state?.TotalReactions + " Reactions"}
                  </Typography>
                </React.Fragment>
              ) : (
                " "
              )}
            </Box>

            <Box>
              <Typography
                sx={{ ml: 1 }}
                color="text.secondary"
                variant="subtitle1"
              >
                <Box sx={{ mr: 2 }} component="span">
                  {state?.TotalComments > 0
                    ? state?.TotalComments + state.TotalReplies + " Comments"
                    : ""}
                </Box>
                <Box component="span">
                  {state?.TotalShares > 0 ? state?.TotalShares + " Shares" : ""}
                </Box>
              </Typography>
            </Box>
          </Box>
          <Divider variant="fullWidth" light={true} />
          <CardActions
            disableSpacing
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              padding: "5px 10px",
            }}
          >
            {state?.isReacted > 0 ? (
              <IconButton
                onClick={handleReact}
                sx={{
                  color: "primary.light",
                  fontSize: ".875rem",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                aria-label="add to favorites"
              >
                <ThumbUpOutlined sx={{ mr: 0.5 }} />
                Like
              </IconButton>
            ) : (
              <IconButton
                onClick={handleReact}
                sx={{
                  color: "text.secondary",
                  fontSize: ".875rem",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                aria-label="add to favorites"
              >
                <ThumbUpOutlined sx={{ mr: 0.5 }} />
                Like
              </IconButton>
            )}

            <IconButton
              onClick={() =>
                dispatch({
                  type: "COMMENT_BUTTON",
                  payload: { showComment: !state.showComment },
                }) + setSharing(false)
              }
              sx={{
                color: "text.secondary",
                fontSize: ".875rem",
                "&:hover": { backgroundColor: "transparent" },
              }}
              aria-label="add to favorites"
            >
              <CommentOutlined sx={{ mr: 0.5 }} />
              Comment
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch({
                  type: "COMMENT_BUTTON",
                  payload: { showComment: false },
                }) + setSharing(!sharing)
              }
              sx={{
                color: "text.secondary",
                fontSize: ".875rem",
                "&:hover": { backgroundColor: "transparent" },
              }}
              aria-label="share"
            >
              <ShareOutlined sx={{ mr: 0.5 }} />
              Share
            </IconButton>
          </CardActions>

          {state?.showComment === true && sharing === false && (
            <CommentCard refetch={refetch} postId={state?.id} />
          )}
          {sharing &&
            (state?.SharedPost ? (
              <SharedPostForm
                close={() => setSharing(false)}
                refetch={refetch}
                sharedPostId={state?.id}
              />
            ) : (
              <SharedPostForm
                close={() => setSharing(false)}
                refetch={refetch}
                sharedPostId={state?.id}
              />
            ))}
        </Card>
      </FeedContext.Provider>
    </React.Fragment>
  );
};

export default FeedCard;
