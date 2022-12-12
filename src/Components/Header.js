import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import React from "react";
const Header = ({ user }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>Gabiflix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/list" className="nav-link">
              Movies List
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <NavDropdown
              title="Perfil"
              id="basic-nav-dropdown"
              className="justify-content-end"
            >
              <NavDropdown.Item>Signed in as: {user.email}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Editar Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => signOut(auth)}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
