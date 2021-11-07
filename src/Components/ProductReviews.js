import React,{useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useFetch from "../Hooks/useFetch";
import PageLoader from "./PageLoader";
import CustomAvatar from "./CustomAvatar";
import { Box } from "@mui/system";
import { Paper, Rating, Stack } from "@mui/material";

export default function ProductReviews({ productId,rating,total }) {
const { data, status, refetch } = useFetch(`/products/reviews/${productId}`);
const [input, setInput] = useState("")
   if(status === "LOADING") return <PageLoader/>
  return (
    <List
      subheader={
        <React.Fragment>
          <Paper
            sx={{
              p: 2,
              pt: 3,
              pb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontSize: 16 }}>
                Reviews ({total})
              </Typography>
            </Box>
            <Box>
              <Stack spacing={1}>
                <Rating
                  size="small"
                  name="half-rating-read"
                  value={Number(rating)}
                  precision={0.5}
                  readOnly
                />
              </Stack>
            </Box>
          </Paper>
        </React.Fragment>
      }
      sx={{ mt: 2, width: "100%", bgcolor: "background.paper" }}
    >
      {!data ? <PageLoader/> : data?.map((review, count) => {
        return (
          <React.Fragment key={count}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <CustomAvatar user={review.User} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    {review?.User?.firstName + " " + review?.User.lastName}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Rating
                      name="half-rating-read"
                      value={Number(review?.rating)}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    {review.review}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" light={true} />
          </React.Fragment>
        );
      })}
    </List>
  );
}
