import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useNavigate } from "react-router-dom";

const NavbarNotLogged = ({ user }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#212529" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalMoviesIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/home")}
            sx={{
              mr: 2,
              display: { xs: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GABIFLIX
          </Typography>
          <Box
            className="justify-content-end"
            sx={{ flexGrow: 1, display: { xs: "flex" } }}
          >
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </Button>

            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/register")}
            >
              REGISTER
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarNotLogged;
