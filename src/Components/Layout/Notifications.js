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
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import CustomAvatar from "../CustomAvatar";
import PageLoader from "../PageLoader";

const getActionMessage = (action) => {
    switch (action) {
      case "FRIEND_REQUEST":
        return " Has sent you a Friend request"
        case "FOLLOW":
            return " Has Followed You"
        case "UNFOLLOW":
            return " Has Unfollowed You"
        case "COMMENT":
            return " Has commented on your post"
        case "UNFRIEND":
            return " Has Unfriended You"
        case "CONFIRM_FRIEND_REQUEST":
            return " Has confirmed your friend request"
      default:
        return "";
    }
}

const NotificationCard = () => {
  const { data, status, refetch } = useFetch("/notifications");
  if (status === "LOADING") return <PageLoader />;
  return (
    <List sx={{ m: 0, p: 0 }}>
      {Array.isArray(data) && data.map((notice, key) => {
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
        )
      })}
      
    </List>
  );
};

export default NotificationCard;
