import { DoubleArrowOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import PageLoader from "./PageLoader";
const Categories = (props) => {

  return (
    <Card>
          <CardHeader title="Categories" />
      <CardContent sx={{ m: 0, p: 0 }}>
        <List  sx={{ m: 0, p: 0 }}>
          {props.data.map((item, index) => {
            return (
              <Link to={`${props.params || ""}/${item.slug}`} key={index}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DoubleArrowOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1">{item.name}</Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default Categories;
