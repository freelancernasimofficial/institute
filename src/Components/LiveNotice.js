
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserCard from './UserCard';
import UserName from './UserName';
const LiveNotice = ({user,text,sx}) => {
    return (
      <Paper
        elevation={5}
        sx={{
          bgcolor: "transparent",
          p: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          ...sx,
        }}
      >
        <UserCard user={user} />{" "}
        <Typography sx={{ ml: 0.5, color: "#ffeb3b" }} variant="h6">
          {text}
        </Typography>
      </Paper>
    );
}
 
export default LiveNotice;