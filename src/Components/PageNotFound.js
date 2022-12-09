import Alert from "react-bootstrap/Alert";
import React from "react";
const PageNotFound = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error 404</Alert.Heading>
      <p>
       Page not found
      </p>
      <hr />
      <p className="mb-0">
        Please try again later
      </p>
    </Alert>
  );
};

export default PageNotFound;
