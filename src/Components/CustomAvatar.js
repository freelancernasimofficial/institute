import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const CustomAvatar = ({ user,sx=null }) => {
  return (user && user?.avatar) ? (
    <Link to={`/user/${user?.username || user?.uuId}`}>
      <Avatar sx={sx} alt={user?.firstName + " " + user?.lastName} src={user?.avatar} />
    </Link>
  ) : (
    <Link to={`/user/${user?.username || user?.uuId}`}>
      <Avatar 
        sx={sx}
        aria-label="recipe"
      >
        {user?.firstName?.substr(0, 1)}
      </Avatar>
    </Link>
  );
};

export default CustomAvatar;
