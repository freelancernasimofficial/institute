import {
  AttachFile,
  CameraAlt,
  InsertEmoticon,
  NewReleases,
  PhotoCamera,
  ShareOutlined,
  Videocam,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import PhotoPreviewer from "../../../Components/PhotoPreviewer";
import { UserContext } from "../../../Contexts/AuthContext";
import { FeedContext } from "./FeedCard";

const Input = styled("input")({
  display: "none",
});
const SharePostForm = ({ refetch, sharedPostId, close }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { postState, postDispatch } = useContext(FeedContext);
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText((prev) => prev + emoji);
  };
  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await axios
        .post("/posts/create/share", {
          sharedPostId: sharedPostId,
          text: text,
        })
        .then((response) => {
          enqueueSnackbar("Status posted", { variant: "success" });
          setText("");
          setLoading(false);
          postDispatch({
            type: "NEW_SHARE",
            payload: {
              TotalShares: ++postState.TotalShares,
            },
          });

          close();
        })
        .catch((error) => {
          enqueueSnackbar("Something went wrong...", {
            variant: "warning",
          });

          close();
          setText("");
        })
        .finally(() => {
          return refetch();
        });
    }, 2000);
  };

  return (
    <React.Fragment>
      <Divider variant="fullWidth" light={true} />
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          p: "7px 15px",
        }}
      >
        <InputBase
          onFocus={() => setShowEmoji(false)}
          value={text}
          fullWidth={true}
          onChange={(e) => setText(e.target.value)}
          endAdornment={
            <React.Fragment>
              <InsertEmoticon
                sx={{
                  mr: 2,
                  color: showEmoji ? "primary.light" : "text.primary",
                  cursor: "pointer",
                  "&:hover": { color: "primary.light" },
                }}
                onClick={() =>
                  showEmoji ? setShowEmoji(false) : setShowEmoji(true)
                }
              />
              <Button
                onClick={handlePost}
                sx={{ p: 1, bgcolor: "primary.main" }}
                variant="contained"
              >
                {loading ? (
                  <CircularProgress size={28} sx={{ color: "text.primary" }} />
                ) : (
                  "SHARE"
                )}{" "}
              </Button>
            </React.Fragment>
          }
          startAdornment={
            <React.Fragment>
              {currentUser?.avatar ? (
                <Avatar
                  sx={{ mr: 1, width: 35, height: 35 }}
                  alt="emanush"
                  src={currentUser?.avatar}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    mr: 1,
                    color: "text.primary",
                    bgcolor: "secondary.main",
                  }}
                >
                  {currentUser?.firstName.substr(0, 1)}
                </Avatar>
              )}
            </React.Fragment>
          }
          placeholder="What's on your mind?"
        />
      </Box>
      {showEmoji && (
        <Picker
          emojiSize={32}
          onSelect={addEmoji}
          showSkinTones={false}
          title="Pick an Emoji"
          showPreview={false}
          useButton={false}
          style={{
            background: "#00000080",
            width: "100%",
            borderRadius: "0",
            border: "none",
          }}
          theme="dark"
          set="facebook"
          i18n={{
            search: "Search",
            categories: { search: "Search", recent: "Recents" },
          }}
        />
      )}
    </React.Fragment>
  );
};

export default SharePostForm;
