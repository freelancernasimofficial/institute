import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  CommentOutlined,
  EmojiEmotionsOutlined,
  ShareOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import moment from "moment";
import { Box } from "@mui/system";
import React from "react";
import {Link} from 'react-router-dom'
const FeedCardShared = ({ sharedPost }) => {
  
  return (
    <React.Fragment>
      <Card
        sx={{
          overflow: "hidden",
          m: "auto",
          border: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.08)",
          maxWidth: "600px",
          mt: 2,
        }}
        elevation={0}
      >
        <CardHeader
          sx={{ bgcolor: "background.paper" }}
          avatar={
            sharedPost?.User?.avatar ? (
              <Avatar alt="emanush.com" src={sharedPost?.User?.avatar} />
            ) : (
              <Avatar
                sx={{ bgcolor: "secondary.dark", color: "common.white" }}
                aria-label="recipe"
              >
                {sharedPost?.User?.firstName?.substr(0, 1)}
              </Avatar>
            )
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <React.Fragment>
              <Link
                to={`/user/${
                  sharedPost?.User?.username || sharedPost?.User?.uuId
                }`}
              >
                {sharedPost?.User?.firstName + " " + sharedPost?.User?.lastName}
              </Link>
            </React.Fragment>
          }
          subheader={moment(sharedPost?.createdAt).fromNow()}
        />
        <Divider variant="fullWidth" light={true} />

        <CardContent>
          <Typography color="text.secondary" variant="body2">
            {sharedPost?.text}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={sharedPost?.thumbnail}
          alt="Paella dish"
        />
        {/* <Box
        component="div"
        sx={{
          p: "20px 15px 5px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <EmojiEmotionsOutlined sx={{ color: "primary.light" }} />
          <Typography sx={{ ml: 1 }} color="text.secondary" variant="subtitle1">
            853 Reactions
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ ml: 1 }} color="text.secondary" variant="subtitle1">
            132 Comments 43 Shares
          </Typography>
        </Box>
      </Box>
      <Divider light={true} variant="fullWidth" />
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          padding: "5px 10px",
        }}
      >
        <IconButton
          sx={{
            color: "text.secondary",
            fontSize: ".875rem",
            "&:hover": { backgroundColor: "transparent" },
          }}
          aria-label="add to favorites"
        >
          <ThumbUpOutlined sx={{ mr: 0.5 }} />
          Like
        </IconButton>
        <IconButton
          sx={{
            color: "text.secondary",
            fontSize: ".875rem",
            "&:hover": { backgroundColor: "transparent" },
          }}
          aria-label="add to favorites"
        >
          <CommentOutlined sx={{ mr: 0.5 }} />
          Comment
        </IconButton>
        <IconButton
          sx={{
            color: "text.secondary",
            fontSize: ".875rem",
            "&:hover": { backgroundColor: "transparent" },
          }}
          aria-label="share"
        >
          <ShareOutlined sx={{ mr: 0.5 }} />
          Share
        </IconButton>
      </CardActions> */}
      </Card>
    </React.Fragment>
  );
};

export default FeedCardShared;
