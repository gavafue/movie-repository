import { Navigate } from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import { useAuthStatus } from "../Hooks/useAuthStatus";

const PrivateRoute = ({ children }) => {
  const { loggedIn, user } = useAuthStatus();

  if (loggedIn === undefined) {
    return <p>Loading ...</p>;
  } else if (loggedIn === true) {
    return <Layout user={user}>{children}</Layout>;
  } else {
    return <Navigate replace to="/"></Navigate>;
  }
};
export default PrivateRoute;
