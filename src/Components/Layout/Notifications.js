import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../../Contexts/Socket";
import useFetch from "../../Hooks/useFetch";
import CustomAvatar from "../CustomAvatar";
import PageLoader from "../PageLoader";
import { useSnackbar } from "notistack";
import LiveNotice from "../LiveNotice";
const getActionMessage = (action) => {
  switch (action) {
    case "FRIEND_REQUEST":
      return " Has sent you a Friend request";
    case "FOLLOW":
      return " Has Followed You";
    case "UNFOLLOW":
      return " Has Unfollowed You";
    case "COMMENT":
      return " Has commented on your post";
    case "UNFRIEND":
      return " Has Unfriended You";
    case "CONFIRM_FRIEND_REQUEST":
      return " Has confirmed your friend request";
    default:
      return "";
  }
};

const NotificationCard = () => {
  const socket = useContext(SocketContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socket.on("FRIEND_REQUEST", (payload) => {
      enqueueSnackbar(
        <LiveNotice
          sx={{ bgcolor: "primary.main" }}
          user={payload}
          text={"Sent You a Friend Request"}
        />,
        {
          variant: "info",
          preventDuplicate: true,
        }
      );
    });

    socket.on("FOLLOW", (payload) => {
      enqueueSnackbar(
        <LiveNotice
          sx={{ bgcolor: "primary.main" }}
          user={payload}
          text={"Is Following You!"}
        />,
        {
          variant: "info",
          preventDuplicate: true,
        }
      );
    });

    socket.on("UNFOLLOW", (payload) => {
      enqueueSnackbar(
        <LiveNotice
          sx={{ bgcolor: "primary.main" }}
          user={payload}
          text={"Has Unfollowed You"}
        />,
        {
          variant: "info",
          preventDuplicate: true,
        }
      );
    });

    socket.on("UNFRIEND", (payload) => {
      enqueueSnackbar(
        <LiveNotice
          sx={{ bgcolor: "primary.main" }}
          user={payload}
          text={"Has Unfriended You"}
        />,
        {
          variant: "info",
          preventDuplicate: true,
        }
      );
    });

    socket.on("CONFIRM_FRIEND_REQUEST", (payload) => {
      enqueueSnackbar(
        <LiveNotice
          sx={{ bgcolor: "primary.main" }}
          user={payload}
          text={"Has confirmed your friend request"}
        />,
        {
          variant: "info",
          preventDuplicate: true,
        }
      );
    });
  }, [enqueueSnackbar, socket]);

  const { data, status, refetch } = useFetch("/notifications");
  if (status === "LOADING") return <PageLoader />;
  return (
    <List sx={{ m: 0, p: 0 }}>
      {Array.isArray(data) &&
        data.map((notice, key) => {
          return (
            <ListItem key={key} sx={{ m: "0 0px 10px 0px", p: 0 }}>
              <ListItemAvatar>
                <CustomAvatar user={notice.ActionUser} />
              </ListItemAvatar>
              <ListItemText>
                <Typography variant="h6">
                  <Link
                    to={`/user/${
                      notice.ActionUser.username || notice.ActionUser.uuId
                    }`}
                  >
                    {notice.ActionUser.firstName +
                      " " +
                      notice.ActionUser.lastName}{" "}
                  </Link>
                  <Typography variant="body2" component="span">
                    {" "}
                    {getActionMessage(notice.actionType)}{" "}
                  </Typography>
                  <Typography component="div" variant="subtitle2">
                    {moment(notice.createdAt).fromNow()}
                  </Typography>
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
    </List>
  );
};

export default NotificationCard;
