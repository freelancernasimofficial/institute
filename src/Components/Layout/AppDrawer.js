import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import {
  AccountBalance,
  AddShoppingCart,
  AttachMoney,
  BarChart,
  CampaignOutlined,
  CategoryOutlined,
  CheckCircle,
  CloudCircleRounded,
  CloudOutlined,
  CodeOff,
  CodeOutlined,
  DesktopMac,
  ExpandLess,
  ExpandMore,
  GetAppOutlined,
  HistoryOutlined,
  ListSharp,

  MissedVideoCallOutlined,

  MonetizationOnOutlined,

  PictureInPicture,
  QuizOutlined,
  SchoolOutlined,
  SellOutlined,
  SettingsOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
  TimelineOutlined,
  VideocamOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { UserContext } from "../../Contexts/AuthContext";

const FeedLeftSidebar = () => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [winHeight, setWinHeight] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(null);
  
  useEffect(() => {
    setWinHeight(window.innerHeight);
    window.addEventListener("resize", (e) => {
      setWinHeight(window.innerHeight);
    });
    return () => {
      setWinHeight(0);
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    setOpen(!open);
    setCurrentMenu(e.target)
  };

  return (
    <Card
      elevation={1}
      sx={{
        boxShadow: 20,
        overflow: "hidden",
        width: "100%",
        position: "relative",
        height: winHeight,
        borderRadius: "0px",
      }}
    >
      <CardHeader
        sx={{ padding: "7px 10px" }}
        avatar={
          currentUser?.avatar ? (
            <Avatar
              sx={{ border: "2px solid", borderColor: "text.primary" }}
              alt="user image"
              src={currentUser?.avatar}
            />
          ) : (
            <Avatar
              sx={{
                border: "2px solid",
                borderColor: "text.primary",
                bgcolor: "primary.main",
                width: "30px",
                height: "30px",
                color: "text.primary",
                cursor: "pointer",
                p: "15px",
              }}
            >
              {currentUser?.firstName?.substr(0, 1)}
            </Avatar>
          )
        }
        title={
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            to={`/user/${currentUser?.username || currentUser?.uuId}`}
          >
            {currentUser?.firstName + " " + currentUser?.lastName}{" "}
            {/* {
              <CheckCircle
                sx={{ color: "text.primary", fontSize: "1rem", ml: 0.5 }}
              />
            } */}
          </Link>
        }
        subheader={currentUser?.designation}
      />

      <CardContent
        sx={{
          bgcolor: "background.default",
          m: 0,
          p: 0,
          height: "100%",
          "--webkit-scrollbar:": "none",
          overflowY: "scroll",
          a: { color: "text.primary" },
          pb: 0,
          h6: { fontWeight: 600 },
          svg: { fontSize: 24 },
        }}
      >
        <List
          sx={{
            margin: 0,
            padding: "0 0 0px 0",
            h6: { color: "text.primary" },
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div">Education Panel</ListSubheader>
          }
        >
          <ListItemButton
            onClick={(e) => handleClick(e) + setCurrentMenu("freelancing")}
          >
            <ListItemIcon>
              <SchoolOutlined />
            </ListItemIcon>
            <ListItemText primary="Freelancing Courses" />
            {open && currentMenu === "freelancing" ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={open && currentMenu === "freelancing" ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton
                onClick={() => history.push("/courses/")}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <CodeOutlined />
                </ListItemIcon>
                <ListItemText primary="Web Design & Developent" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SellOutlined />
                </ListItemIcon>
                <ListItemText primary="Digital Marketing" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PictureInPicture />
                </ListItemIcon>
                <ListItemText primary="Graphic Design" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton>
            <ListItemIcon>
              <SchoolOutlined />
            </ListItemIcon>
            <Link to="/admissions">
              <ListItemText primary="Admissions" />
            </Link>
          </ListItemButton>
        </List>
        <List
          sx={{
            margin: 0,
            padding: "0 0 0px 0",
            h6: { color: "text.primary" },
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div">Explore More</ListSubheader>
          }
        >
          <ListItemButton
            onClick={(e) => handleClick(e) + setCurrentMenu("findJobs")}
          >
            <ListItemIcon>
              <WorkOutlineOutlined />
            </ListItemIcon>
            <ListItemText primary="Find Jobs" />
            {open && currentMenu === "findJobs" ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={open && currentMenu === "findJobs" ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CampaignOutlined />
                </ListItemIcon>
                <ListItemText primary="Affiliate Marketing" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <DesktopMac />
                </ListItemIcon>
                <ListItemText primary="Web Design" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            onClick={(e) => handleClick(e) + setCurrentMenu("earnextra")}
          >
            <ListItemIcon>
              <MonetizationOnOutlined />
            </ListItemIcon>
            <ListItemText primary="Earn Money" />
            {open && currentMenu === "earnextra" ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={open && currentMenu === "earnextra" ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <VideocamOutlined />
                </ListItemIcon>
                <ListItemText primary="Watching Videos" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CodeOutlined />
                </ListItemIcon>
                <ListItemText primary="Programming Quizes" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <GetAppOutlined />
                </ListItemIcon>
                <ListItemText primary="Apps Install" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            onClick={(e) => handleClick(e) + setCurrentMenu("shopping")}
          >
            <ListItemIcon>
              <ShoppingCartOutlined />
            </ListItemIcon>
            <ListItemText primary="Shopping" />
            {open && currentMenu === "shopping" ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={open && currentMenu === "shopping" ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CloudOutlined />
                </ListItemIcon>
                <ListItemText primary="Male Winter Collections" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CloudOutlined />
                </ListItemIcon>
                <ListItemText primary="Female Winter Collections" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <List
          sx={{
            margin: 0,
            padding: "0 0 0px 0",
            h6: { color: "text.primary" },
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<ListSubheader component="div">My Store</ListSubheader>}
        >
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartOutlined />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HistoryOutlined />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <TimelineOutlined />
            </ListItemIcon>
            <ListItemText primary="Finance" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </CardContent>
    </Card>
  );
};

export default FeedLeftSidebar;
