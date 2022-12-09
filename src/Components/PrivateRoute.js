import { Navigate } from "react-router-dom";
import React from "react";
const PrivateRoute = ({children}) => {
  let token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate replace to="/"></Navigate>;
  } else {
    return children;
  }
};
export default PrivateRoute;
