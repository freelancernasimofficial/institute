import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";

import { UserContext } from "../Contexts/AuthContext";
import CustomAvatar from "./CustomAvatar";
import MoreVert from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useSnackbar } from "notistack";
import UserCard from "./UserCard";
const ProfileCard = ({ user, ...props }) => {
  const {currentUser} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUnfriend = async () => {
    const req = await axios.delete(`/user/${user.id}/friends`, {
      params: {
      id:user.id,
    }});
    if (req) {
      enqueueSnackbar("Unfriend Success", { variant: "success" });
      props.refetch();
    } else {
      enqueueSnackbar("Something went wrong...", { variant: "warning" });
    }
  };

  return (
    <React.Fragment>
     
      <Card sx={{ m: 0, width: "100%", bgcolor: "transparent" }} elevation={0}>
        <CardHeader
          action={
            <React.Fragment>
              <IconButton onClick={handleClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={`/user/${user.username || user.uuId}`}>
                    Visit Profile
                  </Link>
                </MenuItem>
                {props?.currentProfileId === currentUser?.id && (
                  <MenuItem onClick={handleUnfriend}>Unfriend</MenuItem>
                )}
              </Menu>
            </React.Fragment>
          }
          sx={{ bgcolor: "background.default" }}
          avatar={<CustomAvatar user={user} />}
          title={
            <Link to={`/user/${user.username || user.uuId}`}>
              <Typography variant="h6">
                {user.firstName + " " + user.lastName}
              </Typography>
            </Link>
          }
          subheader={user.designation}
        />
      </Card>
    </React.Fragment>
  );
};

export default React.memo(ProfileCard);
