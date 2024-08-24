import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getLocalStorage,
} from "../constants/LocalStorageData";
import useGetUsers from "../hooks/useGetUsers";
import { ListItemButton, Stack, styled } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  const { users } = useGetUsers(user?.unique_id);
  const location = useLocation();

  const [selectedUserId, setselectedUserId] = React.useState(null);
  const [selectedMember, setSelectedMember] = React.useState({});

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    clearLocalStorage();
    navigate("/");
  };

  const handleUserClicked = (val) => {
    setSelectedMember(val);
    setselectedUserId(val?.unique_id);
    navigate(`/message/${val?.unique_id}?user=${val?.unique_id}`);
  };

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const user = queryParams.get("user");
    if (user) {
      setselectedUserId(user);
    }
  }, [location.search]);

  const drawer = (
    <div>
      <DrawerHeader
        sx={{
          alignSelf: "flex-start",
        }}
      >
        <Stack direction={"row"} spacing={1.5} pl={2}>
          <LinkedInIcon
            color="black"
            sx={{ alignSelf: "center", width: 25, height: 25 }}
          />
          <Typography sx={{ alignSelf: "center" }}>ChatMe</Typography>
        </Stack>
      </DrawerHeader>
      <Divider />
      <List sx={{ pl: 1, pr: 1 }}>
        {/* {data?.map((val, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate(val?.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {val?.icon}
                </ListItemIcon>
                <ListItemText
                  primary={val?.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))} */}
        {users?.map((val, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              // display: "block",
              backgroundColor:
                selectedUserId == val?.unique_id ? "#e6e6e6" : "white",
            }}
            onClick={() => handleUserClicked(val)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                //justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  //  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  src={process.env.REACT_APP_DEFAULT_IMG}
                  alt="peofile"
                  width={25}
                />
              </ListItemIcon>
              <ListItemText
                primary={val?.username}
                sx={{
                  pl: 2,
                  fontWeight: selectedUserId == val?.unique_id ? "600" : null,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ffffff",
          color: "black",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction={"row"} gap={2}>
            <img
              src={process.env.REACT_APP_DEFAULT_IMG}
              alt="peofile"
              width={30}
              height={30}
              style={{ alignSelf: "center" }}
            />
            <ListItemText
              sx={{ alignSelf: "center" }}
              primary={selectedMember?.username || user?.user_name}
            />
          </Stack>
          <Box flexGrow={1} />
          <IconButton onClick={handleLogOut}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          //container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
