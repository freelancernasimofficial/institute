import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListSubheader } from "@mui/material";
import ChatList from "../../Messages/ChatList";
import { Box } from "@mui/system";
import ChatMessages from "../../../Components/Layout/ChatMessages";

export default function FeedRightSidebar() {
  return <ChatMessages height="700px" />;
}
