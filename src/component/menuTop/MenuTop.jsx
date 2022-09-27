import "./menuTop.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { NavLink } from "react-router-dom";

const MenuTop = () => {
  const pages = [
    {
      name: "Home",
      link: "/contact",
    },
    {
      name: "Home",

      link: "/package",
    },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  // 	setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      className="header"
      sx={{ bgcolor: "transparent", boxShadow: "none", color: "#222222" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", alignItems: "flex-start" }}
        >
          <div className="logo"></div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink to={page.link} className="link">
                      {page.name}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {/* {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                className="bold"
                sx={{
                  my: 2,
                  display: "block",
                  margin: "0 15px",
                  color: "#49DEE9",
                  fontSize: "16px",
                  borderRadius: "20px",
                  height: "40px",
                }}
              >
                <NavLink to={page.link} className="link">
                  {page.name}
                </NavLink>
              </Button>
            ))} */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <NavLink to="/">
              <IconButton
                sx={{
                  marginLeft: "10px",
                  color: "#49DEE9",
                }}
              >
                <HomeRoundedIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </NavLink>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuTop;
