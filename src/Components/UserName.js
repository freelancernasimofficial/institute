import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const UserName = ({user,variant,...props}) => {
    return (
      <Typography {...props} variant={variant || "h6"}>
        <Link to={`/user/${user.username || user.uuId}`}>
          {user.firstName + " " + user.lastName}
        </Link>
      </Typography>
    );
}
 
export default UserName;