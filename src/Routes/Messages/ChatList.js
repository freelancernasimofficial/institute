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
  Stack,
  Divider,
  ListItemAvatar,
  ListItem,
  List,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { UserContext } from "../../Contexts/AuthContext";
import { SocketContext } from "../../Contexts/Socket";
import PageHeader from "../../Components/Layout/PageHeader";
import PageLoader from "../../Components/PageLoader";

const ShowUser = ({ inbox, user }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Link
        style={{
          padding: "10px 0px",
          display: "block",
        }}
        to={`/messages/inbox/conversations/${inbox.uuId}`}
      >
        <ListItem sx={{ p: 0, width: "100%" }} alignItems="flex-start">
          <ListItemAvatar>
            {user?.avatar ? (
              <Avatar alt="emanush.com" src={user?.avatar} />
            ) : (
              <Avatar>{user?.firstName.substr(0, 1)}</Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={user?.firstName + " " + user?.lastName}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {inbox.Messages[inbox.Messages.length - 1].text}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    float: "right",
                    textAlign: "right",
                    fontStyle: "italic",
                  }}
                >
                  {moment(inbox?.createdAt).fromNow()}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </Link>
      <Divider variant="fullWidth" light={true} />
    </Box>
  );
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatList = () => {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const socket = useContext(SocketContext);

  const fetch = useCallback(async () => {
    const res = await axios.get("/messages/");
    setData(res.data);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const [winHeight, setWinHeight] = useState([]);

  useEffect(() => {
    setWinHeight(window.innerHeight - 150);
    window.addEventListener("resize", (e) => {
      setWinHeight(window.innerHeight - 150);
    });
    return () => {
      setWinHeight(0);
    };
  }, []);

  useEffect(() => {
    socket?.on("sendMessage", (payload) => {
      const fetch = async () => {
        const res = await axios.get("/messages/");
        setData(res.data);
      };
      fetch();
    });
  }, [socket]);

  return (
    <Card
      sx={{
        overflow: "hidden",
        width: "100%",
        position: "relative",
        height: winHeight,
      }}
    >
      <CardHeader title="Messenger" />
      {/* <CardContent>
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </StyledBadge>
        </Stack>
      </CardContent> */}

      <CardContent
        sx={{
          bgcolor: "background.default",
          overflow: "auto",
          height: winHeight - 125,
        }}
      >
        {!data ? (
          <PageLoader />
        ) : (
          <List sx={{ width: "100%", p: 0 }}>
            {data?.map((inbox, key) => {
              return (
                <React.Fragment key={key}>
                  {inbox.ownerId === currentUser.id && (
                    <ShowUser inbox={inbox} user={inbox.User} />
                  )}
                  {inbox.userId === currentUser.id && (
                    <ShowUser inbox={inbox} user={inbox.owner} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatList;
