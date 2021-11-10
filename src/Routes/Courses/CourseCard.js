import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PageHeader from "../../Components/Layout/PageHeader";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  RemoveRedEyeOutlined,
  School,
  ShoppingCartOutlined,
  SupportAgentOutlined,
  VideoCameraFront,
} from "@mui/icons-material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CoursePayment } from "../../Helpers/PaymentService";
import axios from "axios";
import PageLoader from "../../Components/PageLoader";

const countVideos = (chapters) => {
  let count = 0;
  chapters?.forEach((chapter) => {
    count += chapter?.totalVideos;
  });

  return count.toString();
};

const CourseCard = ({ course }) => {

  const handleBuy = (id) => {
    const paymentRequest = CoursePayment(id);
    paymentRequest
      .then((response) => {
        window.location.replace(response.data.GatewayPageURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const history = useHistory();
  const buyWithBalance = async (id) => {
    await axios
      .get("/checkout/balance", { params: { productId: id } })
      .then((response) => {
        history.push("/gateway/payment/success");
      })
      .catch((error) => {
        history.push(`/gateway/payment/failed?=${error.message}`);
      });
  };
  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
if (!course) return <PageLoader/>
  return (
    <Card elevation={1}>
      <CardHeader
        sx={{ ".MuiCardHeader-action": { margin: 0, marginTop: "-5px" } }}
        action={
          <Typography
            variant="h6"
            sx={{
              pl: 2,
              pr: 2,
              pt: 0,
              pb: 0,
              color: "success.light",
              fontSize: "20px",
            }}
            component="div"
            value="h6"
          >
            <Typography
              variant="span"
              sx={{
                flexDirection: "column",
                display: "flex",
                alignItems: "end",
              }}
            >
              90% OFF
              {/* <Rating
                name="half-rating-read"
                defaultValue={Number(course.ratingAverage)}
                precision={0.5}
                readOnly
                size="small"
                sx={{ width: "100%" }}
              /> */}
            </Typography>
          </Typography>
        }
        avatar={
          course?.User?.avatar ? (
            <Avatar alt="emanush.com" src={course?.User?.avatar} />
          ) : (
            <Avatar
              sx={{
                bgcolor: "secondary.dark",
                color: "common.white",
              }}
              aria-label="recipe"
            >
              {course?.User?.firstName?.substr(0, 1)}
            </Avatar>
          )
        }
        title={
          <React.Fragment>
            <Link to={`/user/${course?.User?.username || course?.User?.uuId}`}>
              {course?.User?.firstName + " " + course?.User?.lastName}
            </Link>
          </React.Fragment>
        }
        subheader={course?.User?.designation}
      />

      <Box sx={{ maxHeight: "350px", overflow: "hidden" }}>
        <Link
          style={{ padding: 0, margin: 0 }}
          to={`/courses/overview/${course?.uuId}`}
        >
          <ImageListItem
            sx={{
              width: "100%",
              height: "350px !important",
              overflow: "hidden",
            }}
          >
            <img
              src={course.thumbnail}
              style={{ width: "100%", height: "100%" }}
              alt="thumbnail"
            />
            <ImageListItemBar
              sx={{ background: "rgb(0 0 0 / 84%)" }}
              title={
                <React.Fragment>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      a: { "&:hover": { color: "primary.light" } },
                    }}
                    variant="h6"
                    component="h6"
                  >
                    {course?.title}
                  </Typography>
                </React.Fragment>
              }
            />
          </ImageListItem>
        </Link>
      </Box>
      <CardContent
        sx={{
          button: { mb: 1, ml: 1 },
          textAlign: "center",

          padding: "15px 15px",
        }}
      >
        <Box
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            h6: { fontSize: "10px", textAlign: "center" },
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            VIDEOS
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            STUDENTS
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            SUPPORT
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            h6: { fontSize: "15px", textAlign: "center" },
          }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            <VideoCameraFront sx={{ mr: 1, color: "primary.light" }} />{" "}
            {countVideos(course?.Chapters)}
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            <School sx={{ mr: 1, color: "error.light" }} />{" "}
            {course.fakeOrderCount + course.totalOrders}
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            <SupportAgentOutlined sx={{ mr: 1, color: "success.light" }} /> YES
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          pt: 0,
          pb: 1,

          alignItems: "center",
          justifyContent: "flex-end",
        }}
        disableSpacing
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "relative",
            fontWeight: 200,
            color: "text.secondary",
            ":before": {
              content: "' '",
              position: "absolute",
              width: "100%",
              borderBottom: "2px solid red",
              top: 10,
            },
          }}
        >
          &#2547;{course?.regularPrice}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{
            ml: 1,
            fontWeight: 600,
            fontSize: "18px",
            color: "success.light",
          }}
        >
          &#2547;{course?.salePrice}
        </Typography>

        <Button
          onClick={(e) =>
            setShowMenu(!showMenu) + setMenuAnchorEl(e.currentTarget)
          }
          startIcon={<ShoppingCartOutlined />}
          sx={{ bgcolor: "primary.main" }}
          variant="filled"
        >
          Buy Now
        </Button>

        <Menu
          anchorEl={menuAnchorEl}
          variant="menu"
          open={showMenu}
          onClose={() => setShowMenu(false)}
        >
          <MenuItem onClick={() => handleBuy(course.id)}>
            ONLINE PAYMENT
          </MenuItem>
          {/* <MenuItem onClick={() => buyWithBalance(course.id)}>
            USE ACCOUNT BALANCE
          </MenuItem> */}
        </Menu>

        <Button
          startIcon={<RemoveRedEyeOutlined />}
          sx={{
            ml: 1,
            bgcolor: "secondary.main",
            a: { "&:hover": { textDecoration: "none !important" } },
          }}
          variant="filled"
        >
          <Link
            style={{ margin: 0, padding: 0 }}
            to={`/courses/overview/${course?.uuId}`}
          >
            Read More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
