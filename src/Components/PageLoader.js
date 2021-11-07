import { Backdrop, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
const PageLoader = () => {
    return (
     
<Box
  sx={{ color: '#fff', width: '100%', height: '100%',display: 'flex',justifyContent: 'center',alignItems:'center'}}
  open={true}

>
  <CircularProgress color="inherit" />
  </Box>
    );
}
 
export default PageLoader;