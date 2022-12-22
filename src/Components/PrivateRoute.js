import { Navigate } from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import Loader from "./Loader";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import NavbarNotLogged from "./NavbarNotLogged";

const PrivateRoute = ({ children, notLogged }) => {
  const { loggedIn, user } = useAuthStatus();

  if (loggedIn === undefined) {
    return <Loader />;
  } else if (loggedIn === true) {
    return <Layout user={user}>{children}</Layout>;
  } else {
    if (notLogged) {
      return (
        <>
          <NavbarNotLogged />
          <Container>{children}</Container>
          <Footer />
        </>
      );
    }
    return <Navigate replace to="/home"></Navigate>;
  }
};
export default PrivateRoute;
