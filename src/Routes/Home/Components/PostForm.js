import {
  AttachFile,
  CameraAlt,
  InsertEmoticon,
  NewReleases,
  PhotoCamera,
  Videocam,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import PhotoPreviewer from "../../../Components/PhotoPreviewer";
import CustomAvatar from "../../../Components/CustomAvatar";
import { UserContext } from "../../../Contexts/AuthContext";
import UserName from "../../../Components/UserName";
import MoreVert from "@mui/icons-material/MoreVert";
import Compressor from "compressorjs";
import PageLoader from "../../../Components/PageLoader";
const Input = styled("input")({
  display: "none",
});
const PostForm = ({ close, refetch }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [openForm, setopenForm] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useContext(UserContext);
 

  const handleCompressedUpload = (e) => {
     setImage("converting");
    const image = e.target.files[0];
    new Compressor(image, {
      maxWidth:1280,
      convertSize: Infinity,
      convertTypes:['image/jpg'],
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        const myFile = new File([compressedResult], "image.jpeg", {
          type: compressedResult.type,
        });
        setImage(myFile);
      },
    });
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText((prev) => prev + emoji);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (text.length > 0 || image) {
      setLoading(true);

      const formData = new FormData();
      formData.append("postimage", image);
      formData.set("text", text);

      setTimeout(() => {
        axios({
          method: "post",
          url: "/posts/create",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            enqueueSnackbar("Status posted", { variant: "success" });
            setText("");

            setLoading(false);

            close();
          })
          .catch((error) => {
            enqueueSnackbar(`${error?.response?.message || error?.message}`, {
              variant: "warning",
            });

            setText("");
            close();
          })
          .finally(() => {
            refetch();
          });
      }, 2000);
    }
  };

  return (
    <Dialog
      fullWidth
      sx={{ bgcolor: "transparent" }}
      open={openForm}
      onClose={() => close()}
      onBackdropClick={() => close()}
    >
     
      <Card elevation={1} sx={{ m: 0, width: "100%" }}>
        <form
          onSubmit={handlePost}
          action="/"
          method="post"
          encType="multipart/form-data"
        >
          <CardHeader
            action={
              <React.Fragment>
                <IconButton
                  onClick={(e) =>
                    setOpenMenu(true) + setAnchorEl(e.currentTarget)
                  }
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  PaperProps={{ elevation: 1, sx: { boxShadow: 10 } }}
                  onClose={(e) => setOpenMenu(false) + setAnchorEl(null)}
                  onClick={(e) => setOpenMenu(false) + setAnchorEl(null)}
                  anchorEl={anchorEl}
                  open={openMenu}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                  }}
                >
                  <MenuItem>Public Post</MenuItem>
                  <MenuItem>Only Me</MenuItem>
                </Menu>
              </React.Fragment>
            }
            avatar={<CustomAvatar user={currentUser} />}
            title={<UserName user={currentUser} />}
            subheader="Creating a New Post"
          />
          <Divider variant="fullWidth" />
          <CardContent sx={{ p: 0, bgcolor: "background.default" }}>
            <TextField
              onFocus={() => setShowEmoji(false)}
              fullWidth={true}
              variant="standard"
              placeholder="What's on your mind?"
              type="text"
              autoFocus
              multiline
              rows={10}
              onChange={(e) => setText(e.currentTarget.value)}
              value={text}
              inputProps={{ sx: { p: 2, pb: 0 } }}
            />

            {image==="converting" && <PageLoader/>}
            {image!==null && image!=="converting" && <PhotoPreviewer src={URL?.createObjectURL(image)} />}
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
            <label htmlFor="icon-button-file">
              <Input
                onChange={(e) =>handleCompressedUpload(e)}
                accept="image/*"
                id="icon-button-file"
                type="file"
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera
                  sx={{
                    color: "text.primary",
                    cursor: "pointer",
                    "&:hover": { color: "primary.light" },
                  }}
                />
              </IconButton>
            </label>
            <InsertEmoticon
              sx={{
                color: showEmoji ? "primary.light" : "text.primary",
                cursor: "pointer",
                "&:hover": { color: "primary.light" },
              }}
              onClick={() =>
                showEmoji ? setShowEmoji(false) : setShowEmoji(true)
              }
            />
            <Videocam
              sx={{
                cursor: "pointer",
                "&:hover": { color: "primary.light" },
              }}
              color="white"
            />

            <Button
              type="submit"
              sx={{ ml: 2 }}
              variant="contained"
              color="primary"
            >
              {loading ? (
                <CircularProgress size={28} sx={{ color: "text.primary" }} />
              ) : (
                "POST STATUS"
              )}
            </Button>
          </CardActions>
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
        </form>
      </Card>
    </Dialog>
  );
};

export default PostForm;
