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
import React, {useState } from "react";
import { useSnackbar } from "notistack";
import "emoji-mart/css/emoji-mart.css";
import Compressor from "compressorjs";
import PhotoPreviewer from "./PhotoPreviewer";
import PageLoader from "./PageLoader";

const Input = styled("input")({
  display: "none",
});
const ChangePhoto = ({ params, name }) => {
  const [image, setImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);


  const handleCompressedUpload = (e) => {
    setImage("converting")
    const image = e.target.files[0];
    new Compressor(image, {
      maxWidth: 1280,
      convertSize: Infinity,
      convertTypes: ["image/jpg"],
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
          {image === "converting" && <PageLoader />}
          {image !== null && image !== "converting" && (
            <PhotoPreviewer src={URL?.createObjectURL(image)} />
          )}
      
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
          <label htmlFor="icon-button-file">
            <Input
              onChange={(e) => handleCompressedUpload(e)}
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
