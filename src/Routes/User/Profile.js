import {
  AccountCircleOutlined,
  AddCircleOutlined,
  CheckCircle,
  Edit,
  MailOutlined,
  PeopleAlt,
  PeopleOutlined,
  RssFeed,
  ShoppingBagOutlined,
  TimelineSharp,
  WorkOutline,
} from "@mui/icons-material";
import {
  Menu,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
  Container,
  Paper,
  MenuItem,
  IconButton,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomAvatar from "../../Components/CustomAvatar";
import Timeline from "./partials/Timeline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import About from "./partials/About";
import Friends from "./partials/Friends";
import Shop from "./partials/Shop";
import RecentWorks from "./partials/RecentWorks";
import PageLoader from "../../Components/PageLoader";
import useFetch from "../../Hooks/useFetch";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { UserContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import MoreVert from "@mui/icons-material/MoreVert";
import { MessengerContext } from "../../Contexts/MessengerProvider";
import { SocketContext } from "../../Contexts/Socket";

const Profile = () => {
  const [partial, setPartial] = useState("TIMELINE");
  const [value, setValue] = useState(0);
  const [postForm, setPostForm] = useState(true);
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const { data, status, refetch } = useFetch(window.location.pathname);
  const [state, dispatch] = useContext(MessengerContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
  const anchorEl = React.useRef(null);
  const [open, setOpen] = useState(false)
  
  const handleClick = () => {
    setOpen(!open)
  };


  const addFriend = () => {
    socket.emit(
      "FRIEND_REQUEST",
      {
        roomId: data.uuId,
        userId: data?.id,
        currentUser,
      },
      (response) => {
        console.log('addFriend', response);
        enqueueSnackbar("Request sent", { variant: "default" });
        refetch();
      }
    );
  };

  const unFriend = () => {
    socket.emit(
      "UNFRIEND",
      { roomId: data.uuId, userId: data?.id, currentUser },
      (response) => {
        console.log("unfriend", response);
        enqueueSnackbar("Unfriend Done", { variant: "default" });
        refetch();
      }
    );
  };

  const confirmFriend = () => {
    socket.emit(
      "CONFIRM_FRIEND_REQUEST",
      { roomId: data.uuId, userId: data?.id, currentUser },
      (response) => {
        console.log("confirmFriend", response);
        enqueueSnackbar("Confirmed Request", { variant: "default" });
        refetch();
      }
    );
  };

  const follow = () => {
    socket.emit(
      "FOLLOW",
      { roomId: data.uuId, userId: data.id, currentUser },
      (response) => {
        console.log("follow", response);
        enqueueSnackbar("Following", { variant: "default" });
        refetch();
      }
    );
  };
  const unFollow = () => {
    socket.emit(
      "UNFOLLOW",
      {
        userId: data.id,
        roomId: data.uuId,
        currentUser,
      },
      (response) => {
        enqueueSnackbar("Unfollow Done", { variant: "default" });
        refetch();
      }
    );
  };

  const handleOpenMessenger = (user) => {
    const filterCurrentFriends = state.friends.filter(
      (friend) => friend.uuId === data.uuId
    );

    if (!filterCurrentFriends.length > 0) {
      dispatch({
        type: "OPEN_MESSENGER",
        payload: data,
      });
    }
  };

  if (status === "LOADING") return <PageLoader />;
  return (
    <Container maxWidth="lg" disableGutters>
      <Card
        elevation={1}
        sx={{
          width: "100%",
          margin: "auto",
          mt: 1.3,

          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <CardContent
          sx={{
            border: "2px solid grey",
            p: 0,
            borderTopRightRadius: 1,
            borderTopLeftRadius: 1,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            position: "relative",
            height: 400,
            backgroundSize: "cover",
            backgroundImage: `url(${data?.coverphoto})`,
          }}
        >
          <CustomAvatar
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontSize:50,
              minWidth: 200,
              minHeight: 200,
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%) translateY(50%)",
            }}
            user={data}
          />
        </CardContent>
        <CardContent>
          <Box sx={{ maxWidth: 500, m: "auto", pt: 13, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {data?.firstName + " " + data?.lastName}
              {/* <CheckCircle
                sx={{ fontSize: 17, ml: 0.5, color: "primary.light" }}
              /> */}
            </Typography>
            <Typography variant="subtitle1">{data?.designation}</Typography>
          </Box>
        </CardContent>

        {data.id !== currentUser.id ? (
          <CardActions
            sx={{
              justifyContent: "center",

              margin: "auto",
              p: 0,
              display: "flex",
              alignItems: "center",
              pb: 3,
            }}
          >
            {data.isMyFollower > 0 && data.isMeFollowing < 1 && (
              <Button
                color="info"
                onClick={follow}
                variant="contained"
                startIcon={<RssFeed />}
              >
                Follow Back
              </Button>
            )}

            {data.isMeFollowing < 1 && data.isMyFollower < 1 && (
              <Button
                onClick={follow}
                sx={{ bgcolor: "success.main" }}
                variant="contained"
                startIcon={<RssFeed />}
              >
                Follow
              </Button>
            )}

            {data.isMeFollowing > 0 && data.isMyFollower < 1 && (
              <Button
                onClick={unFollow}
                color="error"
                variant="contained"
                startIcon={<RssFeed />}
              >
                Unfollow
              </Button>
            )}

            {data.isRequestPending > 0 && (
              <Button
                onClick={confirmFriend}
                variant="contained"
                color="error"
                startIcon={<PeopleAlt />}
              >
                Confirm Request
              </Button>
            )}

            {data.isFriendRequestSent > 0 &&
              data.isMyFriend < 1 &&
              data.isRequestPending < 1 && (
                <Button
                  onClick={unFriend}
                  variant="contained"
                  color="error"
                  startIcon={<PeopleAlt />}
                >
                  Cancel Request
                </Button>
              )}

            {data.isMyFriend > 0 && (
              <Button
                variant="contained"
                sx={{ bgcolor: "background.default", boxShadow: "none" }}
                startIcon={<PeopleAlt />}
              >
                Friends
              </Button>
            )}
            {data.isFriendRequestSent < 1 &&
              data.isMyFriend < 1 &&
              data.isRequestPending < 1 && (
                <Button
                  onClick={addFriend}
                  variant="contained"
                  color="success"
                  startIcon={<PeopleAlt />}
                >
                  Add Friend
                </Button>
              )}

            <Button
              onClick={() => handleOpenMessenger(data)}
              variant="contained"
              color="primary"
              startIcon={<MailOutlined />}
            >
              Message
            </Button>
            <IconButton
              ref={anchorEl}
              sx={{ m: 0, p: 0 }}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>

            <Menu
              anchorEl={anchorEl.current}
              open={open}
              onClose={handleClick}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClick}>
                <Link to={`/user/${data.username || data.uuId}`}>
                  Block
                </Link>
              </MenuItem>
              {data.isMyFriend > 0 && (
                <MenuItem onClick={() => unFriend() + handleClick()}>
                  Unfriend
                </MenuItem>
              )}
              {data.isMeFollowing > 0 && data.isMyFollower > 0 && (
                <MenuItem onClick={() => unFollow()+ handleClick()}>Unfollow</MenuItem>
              )}
            </Menu>
          </CardActions>
        ) : (
          <CardActions
            sx={{
              justifyContent: "center",

              margin: "auto",
              p: 0,
              display: "flex",
              alignItems: "center",
              pb: 3,
            }}
          >
            <Button
              onClick={() => setPostForm(false)}
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlined />}
            >
              New Post
            </Button>
            <Button
              onClick={() =>
                history.push(`/user/${data.username || data.uuId}/edit`)
              }
              variant="contained"
              color="secondary"
              startIcon={<Edit />}
            >
              Edit Profile
            </Button>
          </CardActions>
        )}
      </Card>

      <Paper
        elevation={2}
        sx={{
          zIndex: 10,
          position: "sticky",
          top: 0,
          borderRadius: 0,
          width: "100%",

          overflow: "auto",
        }}
      >
        <Tabs
          variant="scrollable"
          sx={{
            svg: { fontSize: 24, mb: "5px" },
            ".MuiTabs-flexContainer": {
              justifyContent: "space-between",
              p: 1,
              pt: 0.5,
              pb: 0.5,
            },
            button: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "text.primary",
              "&.Mui-selected": { color: "text.primary" },
            },
          }}
          TabIndicatorProps={{ sx: { bgcolor: "text.primary" } }}
          value={value}
          onChange={handleChange}
        >
          <Tab
            onClick={() => setPartial("TIMELINE")}
            label={
              <React.Fragment>
                <TimelineSharp /> Timeline
              </React.Fragment>
            }
          />
          <Tab
            onClick={() => setPartial("FRIENDS")}
            label={
              <React.Fragment>
                <PeopleOutlined /> Friends ({data.totalFriends})
              </React.Fragment>
            }
          />
          <Tab
            onClick={() => setPartial("ABOUT")}
            label={
              <React.Fragment>
                <AccountCircleOutlined /> About
              </React.Fragment>
            }
          />
          <Tab
            onClick={() => setPartial("SHOP")}
            label={
              <React.Fragment>
                <ShoppingBagOutlined /> Shop
              </React.Fragment>
            }
          />
          <Tab
            onClick={() => setPartial("RECENTWORKS")}
            label={
              <React.Fragment>
                <WorkOutline /> Recent Works
              </React.Fragment>
            }
          />
        </Tabs>
      </Paper>

      <Box sx={{ minHeight: "100%" }}>
        {partial === "TIMELINE" && (
          <Timeline
            setPostForm={setPostForm}
            postForm={postForm}
            userId={data?.id}
          />
        )}
        {partial === "FRIENDS" && <Friends userId={data?.id} />}
        {partial === "SHOP" && <Shop userId={data?.id} />}
        {partial === "RECENTWORKS" && <RecentWorks userId={data?.id} />}
        {partial === "ABOUT" && <About response={data} />}
      </Box>
    </Container>
  );
};

export default Profile;
