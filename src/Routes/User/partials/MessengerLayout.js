
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { MessengerContext } from '../../../Contexts/MessengerProvider';
import Messenger from './Messenger';

const MessengerLayout = () => {
  const [state] = useContext(MessengerContext)
  
   
    return state && (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          zIndex: 99999,
          position: "absolute",
          width: "auto",
          height: "auto",
          bottom: "60px",
          right: "20%",
        }}
        component="div"
      >
        {state.friends.length >0 && (
          state.friends.map((user,idkey) => {
           return (
             <Box key={idkey} component="div" sx={{ display: "inline", ml: 2 }}>
               <Messenger user={user} />
             </Box>
           );
         })
        )}
      </Box>
    );
}
 
export default React.memo(MessengerLayout);