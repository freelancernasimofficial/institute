import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Grid from "@mui/material/Grid";
import FeedLeftSidebar from "./Components/FeedLeftSidebar";
import FeedRightSidebar from "./Components/FeedRightSidebar";
import FeedCard from "./Components/FeedCard";
import { Box } from "@mui/system";
import { Button, Divider, IconButton, Paper, TextField } from "@mui/material";
import { UserContext } from "../../Contexts/AuthContext";
import PostForm from "./Components/PostForm";
import CustomAvatar from "../../Components/CustomAvatar";
import { loadPostsReducer } from "../../Reducers/PostReducer";
import PageLoader from "../../Components/PageLoader";
import useFetch from "../../Hooks/useFetch";
import {
  EmojiEmotionsOutlined,
  PhotoCamera,
  Send,
  Videocam,
} from "@mui/icons-material";
import { Emoji } from "emoji-mart";
import axios from "axios";

const Newsfeed = () => {
  const { currentUser } = useContext(UserContext);
  const [isPosting, setisPosting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [offset, setoffset] = useState(5);

  const fetchData = useCallback(async () => {
    setPosts("LOADING");
    const resposne = await axios.get("/", {
      params: {
        offset: 5,
      },
    });

    setPosts(resposne.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  ///////infitizen

  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop + 700 > e.currentTarget.scrollHeight) {
      const loadMore = async () => {
        const response = await axios.get("/", {
          params: {
            offset: posts.length + 5,
          },
        });

        if (response) {
          setPosts((prev) => [...prev, ...response.data]);
        }
      };
      loadMore();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (posts.length < 0) return <PageLoader />;

  return (
    <Grid
      container
      spacing={0}
      justifyContent="space-between"
      sx={{
        mt: 0,
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        sm={3}
        md={3}
        lg={3}
        xl={3}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          height: "100%",
          overflow: "scroll",
          pt: "20px",
        }}
      >
        <FeedLeftSidebar />
      </Grid>

      <Grid
        onScroll={handleScroll}
        sx={{ overflow: "scroll", height: "100%", p: "0", pt: "20px" }}
        item
        sm={12}
        md={6}
        lg={6}
        xl={6}
        xs={12}
      >
        {!isPosting && (
          <Paper
            onClick={() => setisPosting(true)}
            sx={{
              ":focus": { outline: "none" },
              m: "auto",
              mb: 1,
              maxWidth: "600px",
            }}
          >
            <Box
              sx={{
                p: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box ml={1}>
                {currentUser && <CustomAvatar user={currentUser} />}
              </Box>

              <TextField
                variant="standard"
                placeholder="What's on your mind?"
                type="text"
                fullWidth={true}
                sx={{
                  "&:hover": {
                    borderBottom: "0px",
                    outline: "none",
                  },
                }}
                inputProps={{
                  sx: {
                    borderBottom: "0",

                    ":focus": {
                      "&::before": {
                        content: "none",
                      },
                      "&::after": {
                        content: "none",
                      },
                    },
                    "&:hover": {
                      outline: "none",
                      borderBottom: 0,
                      "&:before": {
                        content: "none",
                      },
                      "&:after": {
                        content: "none",
                      },
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    borderBottom: "0",
                    p: 3,
                    ":focus": {
                      "&::before": {
                        borderBottom: "0px",
                        outline: "none",
                      },
                      "&::after": {
                        borderBottom: "0px",
                        outline: "none",
                      },
                    },
                    "&:hover": {
                      outline: "none",
                      borderBottom: 0,
                      "&::before": {
                        content: "none",
                      },
                      "&::after": {
                        content: "none",
                      },
                    },
                    "&::before": {
                      content: "none",
                    },
                    "&::after": {
                      content: "none",
                    },
                  },
                }}
              />
              <IconButton>
                <Send />
              </IconButton>
            </Box>
            <Divider variant="fullWidth" light />
            <Box
              sx={{
                p: 1,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton>
                <PhotoCamera />
              </IconButton>
              <IconButton>
                <EmojiEmotionsOutlined />
              </IconButton>
              <IconButton>
                <Videocam />
              </IconButton>
            </Box>
          </Paper>
        )}

        {isPosting && (
          <PostForm refetch={fetchData} close={() => setisPosting(false)} />
        )}

        {Array.isArray(posts) && (
          <React.Fragment>
            {posts?.map((post, key) => {
              return <FeedCard refetch={fetchData} key={key} post={post} />;
            })}
          </React.Fragment>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        md={3}
        lg={3}
        xl={3}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          height: "100%",
          overflow: "scroll",
          p: 0,
          pt: "20px",
        }}
      >
        <FeedRightSidebar />
      </Grid>
    </Grid>
  );
};

export default Newsfeed;
