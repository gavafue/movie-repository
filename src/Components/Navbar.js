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
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#212529" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalMoviesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GABIFLIX
          </Typography>

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
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/home")}
              >
                <Typography textAlign="center">HOME</Typography>
              </MenuItem>

              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/movies")}
              >
                <Typography textAlign="center">MOVIES</Typography>
              </MenuItem>

              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/series")}
              >
                <Typography textAlign="center">SERIES</Typography>
              </MenuItem>

              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/contact")}
              >
                <Typography textAlign="center">CONTACT</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <LocalMoviesIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GABIFLIX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
              onClick={() => navigate("/home")}
            >
              HOME
            </Button>

            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/movies")}
            >
              MOVIES
            </Button>

            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/series")}
            >
              SERIES
            </Button>

            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/contact")}
            >
              CONTACT
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`Open settings for ${user.email}`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleRoundedIcon
                  fontSize="large"
                  sx={{ color: "white" }}
                />
              </IconButton>
            </Tooltip>
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
              <MenuItem>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center" onClick={() => signOut(auth)}>
                  Sign out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
