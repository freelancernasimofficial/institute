import { Grow } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
const Typing = ({open,sx}) => {
    const converted = {
        opacity: open ? 1 : 0,
        transition:'.5s',
  alignItems: "center", display: "flex", height: "17px" ,
  " .tidot": { backgroundColor: "#90949c" },
  ".tidot": {
    WebkitAnimation: "mercuryTypingAnimation 1.5s infinite ease-in-out",
    borderRadius: "100%",
    display: "inline-block",
    height: "6px",
    marginRight: "2px",
    width: "6px",
  },
  "@-webkit-keyframes mercuryTypingAnimation": {
    "0%": { WebkitTransform: "translateY(0px)" },
    "28%": { WebkitTransform: "translateY(-5px)" },
    "44%": { WebkitTransform: "translateY(0px)" },
  },
  ".tidot:nth-of-type(1)": { WebkitAnimationDelay: "200ms" },
  ".tidot:nth-of-type(2)": { WebkitAnimationDelay: "300ms" },
  ".tidot:nth-of-type(3)": { WebkitAnimationDelay: "400ms" },
};



    return (
    
        <Box sx={{...converted,...sx}}>
         
            <div className="tidot"></div>
            <div className="tidot"></div>
            <div className="tidot"></div>
        
        </Box>
 
    );
}
 
export default Typing;