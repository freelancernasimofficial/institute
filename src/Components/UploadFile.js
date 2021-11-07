import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../Contexts/AuthContext";

import {
  Button,
  Card,
  Paper,
  Grid,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";
import { Box } from "@mui/system";
import PhotoPreviewer from "./PhotoPreviewer";
const UploadFile = (props) => {
  const [select, setSelect] = useState(null);
  const [preview, setpreview] = useState(null);
    const { currentUser } = useContext(UserContext);
      const [notification, setNotification] = useState("");
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(props?.name, select);
    axios({
      method: "post",
      url: props?.url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
       setNotification(
    
       );
      })
        .catch(function (error) {
  
         setNotification(
        
         );
      });
  };

 

  return (
    <Card>
      <CardHeader title="Change Picture" />
      <CardContent>
        <FormControl fullWidth>
          <form
            onSubmit={(e) => handleUpload(e)}
            method="post"
            encType="multipart/form-data"
          >
            <div
              className="dropify-wrapper has-preview"
              style={{
                height: "192px",
                border: "1px solid #262f51",
                background: "#00000042",
              }}
            >
              <div className="dropify-message">
                <span className="file-icon">
                  <p>Drag and drop a file here or click</p>
                </span>
                <p className="dropify-error">
                  Ooops, something wrong appended.
                </p>
              </div>
              <div className="dropify-errors-container">
                <ul />
              </div>
              <input
                onChange={(e) =>
                  setSelect(e.target.files[0]) +
                  setpreview(URL.createObjectURL(e.target.files[0]))
                }
                accept="image/*"
                name="avatar"
                type="file"
                className="dropify"
                data-default-file={preview && preview}
                data-height={180}
              />

             {preview && <PhotoPreviewer src={preview}/>}
            </div>
            <CardActions>
              {select && preview ? (
                <>
                  <Button
                    sx={{ mr: 2 }}
                    startIcon={<Save />}
                    color="info"
                    variant="contained"
                    type="submit"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={(e) => {
                      return setSelect(null) + setpreview(null);
                    }}
                    startIcon={<Save />}
                    color="info"
                    variant="contained"
                    type="submit"
                  >
                    Remove
                  </Button>
                </>
              ) : (
                ""
              )}
            </CardActions>
          </form>
        </FormControl>
      </CardContent>
      {notification ?? ""}
    </Card>
  );
};

export default UploadFile;
