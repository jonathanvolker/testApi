import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { logout, useAuthDispatch, useAuthState } from "../../Context";
import { useHistory } from "react-router-dom";
import "./MenuAppBar.css";

export default function MenuAppBar({ handleBtnClick }) {
  const dispatch = useAuthDispatch();
  const state = useAuthState();
  let seller = state?.user?.name ?? "";
  const avatar = state?.imageLink ? state.imageLink : null;

  // console.log(state);
  let history = useHistory();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleBrandClick = () => {
    history.push("/home");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    // console.log("logging out");
    await logout(dispatch);
    // console.log("sign out");
    // setAnchorEl(null);
  };

  const redirectOnSignOut = () => {
    history.push("/login");
  };

  React.useEffect(() => {
    if (state.user === "") {
      console.log("redirecting on sign out");
      redirectOnSignOut();
    }
  }, [state.user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#E2DFDF", padding: "2% 0" }}>
        <Toolbar>
          <div onClick={handleBtnClick}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                "& svg": {
                  fontSize: "35px",
                  color: "black",
                  fill: "black",
                },
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <Typography
            variant="h6"
            component="div"
            className="main-title"
            sx={{
              flexGrow: 1,
              fontFamily: "Poppins",
              fontSize: "30px",
              fontStyle: "SemiBold",
              "@media screen and (max-width: 768px)": {
                fontSize: "14px",
              },
            }}
            onClick={handleBrandClick}
          >
            HPM GENERADOR DE COTIZACIONES
          </Typography>
          {auth && (
            <div className="avatar-container">
              <Typography>{seller}</Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  "& svg": {
                    fontSize: "35px",
                    color: "black",
                    fill: "black",
                  },
                }}
              >
                <Avatar src={avatar} alt="PF" />
              </IconButton>
              <Menu
                id="acoount-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
