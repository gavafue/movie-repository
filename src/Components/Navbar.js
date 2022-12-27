import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Favourites from "./Favourites";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElFavorites, setAnchorFavorites] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenFavorites = (event) => {
    setAnchorFavorites(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseFavorites = () => {
    setAnchorFavorites(null);
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
            onClick={() => navigate("/home")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer" 
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
              onClick={(e) => handleOpenNavMenu(e)}
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
                <Typography textAlign="center">Home</Typography>
              </MenuItem>

              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/movies")}
              >
                <Typography textAlign="center">Movies</Typography>
              </MenuItem>

              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/series")}
              >
                <Typography textAlign="center">Series</Typography>
              </MenuItem>

              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/contact")}
              >
                <Typography textAlign="center">Contact</Typography>
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
            onClick={() => navigate("/home")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer" 
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

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <Avatar
              sx={{ margin: "0 10px 0 10px", cursor: "pointer" }}
              onClick={(e) => handleOpenFavorites(e)}
            >
              <FavoriteIcon />
            </Avatar>
            <Menu
              style={{ width: "450px !important" }}
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElFavorites}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElFavorites)}
              onClose={handleCloseFavorites}
            >
              <Favourites />
            </Menu>
            <Tooltip title={`Open settings for ${user?.email}`}>
              <IconButton onClick={(e) => handleOpenUserMenu(e)} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "rgb(103, 58, 183)" }}>
                  {user?.email?.slice(0, 1)}
                </Avatar>
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
