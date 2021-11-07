import * as React from "react";
import Typography from "@mui/material/Typography";
import CustomAvatar from "./CustomAvatar";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CustomAvatar sx={{flex:0}} user={user || {}} />

      <Typography variant="h6" sx={{ ml: 1.2,flex:1 }}>
        <Link to={`/user/${user?.username || user?.uuId}`}>
          {user?.firstName + " " + user?.lastName}
        </Link>
        <Typography variant="subtitle1" component="div">
          {user.designation}
        </Typography>
      </Typography>
    </Box>
  );
}
