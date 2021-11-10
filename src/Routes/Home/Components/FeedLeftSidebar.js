import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Rating,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import { CheckCircle, School } from "@mui/icons-material";
import { UserContext } from "../../../Contexts/AuthContext";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Box } from "@mui/system";
import useFetch from "../../../Hooks/useFetch";
import PageLoader from "../../../Components/PageLoader";
import UserName from "../../../Components/UserName";
import ProductReviews from "../../../Components/ProductReviews";
const FeedLeftSidebar = () => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [winHeight, setWinHeight] = useState([]);
  const { data, status } = useFetch("/courses/top/rated");
  useEffect(() => {
    setWinHeight(window.innerHeight - 150);
    window.addEventListener("resize", (e) => {
      setWinHeight(window.innerHeight - 150);
    });
    return () => {
      setWinHeight(0);
    };
  }, []);
  if (status === "LOADING") return <PageLoader />;
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor:'background.default',
        overflow: "hidden",
        width: "100%",
        position: "relative",
        height: winHeight,
      }}
    >
      <Box
        sx={{
          m: 0,
          p: 0,
          height: "100%",
          "--webkit-scrollbar:": "none",
          overflowY: "scroll",
          a: { color: "text.primary" },
          pb: 0,
          h6: { fontWeight: 600 },
          svg: { fontSize: 24 },
        }}
      >
        <List
          sx={{pb:5,
            width: "100%",
            a: { "&:hover": { textDecoration: "underline" } },
          }}
          subheader={<ListSubheader  sx={{zIndex:99,bgcolor:'background.default',color:'text.primary'}}>Top Rated Courses</ListSubheader>}
        >
          {data.map((course, number) => {
            return (
              <React.Fragment key={number}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      sx={{ borderRadius: 0 }}
                      alt="Remy Sharp"
                      src={course.thumbnail}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link to={`/courses/overview/${course.uuId}`}>
                        <Typography color="text.primary">
                          {course.title}
                        </Typography>
                      </Link>
                    }
                    secondary={
                      <React.Fragment>
                        <UserName
                          component="span"
                          sx={{
                            fontSize: 12,
                            fontWeight: 400,
                            a: { color: "primary.light" },
                          }}
                          user={course.User}
                        />
                        <Rating
                          name="half-rating-read"
                          defaultValue={Number(course.ratingAverage)}
                          precision={0.5}
                          readOnly
                          size="small"
                          sx={{ width: "100%", svg: { fontSize: 16 } }}
                        />
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};

export default FeedLeftSidebar;
