import moment from "moment";
import React, { useEffect, useState } from "react";


import {
  CardHeader,
  TextField,
  Typography,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Select,
  FormControl,
  InputLabel,
  Container,
  Paper,
} from "@mui/material";
import NotificationCard from "../../Components/Layout/Notifications";

const AllNotifications = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
    return () => {};
  }, [props.data]);
  return (
    <Container maxWidth="md" sx={{mt:3}}>
      <Card>
        <CardHeader title="Notifications" />

        <CardContent>
         
          <NotificationCard/>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AllNotifications;
