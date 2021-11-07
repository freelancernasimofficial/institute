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
import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import MoreVert from "@mui/icons-material/MoreVert";
import CustomAvatar from "./CustomAvatar";
import { UserContext } from "../Contexts/AuthContext";
import UserName from "./UserName";
import PhotoPreviewer from "./PhotoPreviewer";

const Input = styled("input")({
  display: "none",
});
const ChangePhoto = ({ params, name }) => {
  const [image, setImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handlePost = (e) => {
    e.preventDefault();
    if (image) {
      setLoading(true);
      const formData = new FormData();
      formData.append(name, image);
      setTimeout(() => {
        axios({
          method: "post",
          url: params,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            enqueueSnackbar("Picture Changed", { variant: "success" });
            setLoading(false);
          })
          .catch((error) => {
            enqueueSnackbar(`${error?.response?.message || error?.message}`, {
              variant: "warning",
            });
          });
      }, 2000);
    }
  };

  return (
    <Card elevation={1} sx={{ m: 0, width: "100%" }}>
      <form
        onSubmit={handlePost}
        action="/"
        method="post"
        encType="multipart/form-data"
      >
        <Divider variant="fullWidth" />
        <CardContent sx={{ p: 0, bgcolor: "background.default" }}>
          {image !== null && (
            <PhotoPreviewer width={"100%"} src={URL.createObjectURL(image)} />
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
          <label htmlFor="icon-button-file">
            <Input
              onChange={(e) => setImage(e.currentTarget.files[0])}
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

          <Button
            type="submit"
            sx={{ ml: 2 }}
            variant="contained"
            color="primary"
          >
            {loading ? (
              <CircularProgress size={28} sx={{ color: "text.primary" }} />
            ) : (
              "Upload"
            )}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default ChangePhoto;
