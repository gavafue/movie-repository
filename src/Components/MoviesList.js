import { Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Routes = () => {
  let token = localStorage.getItem("token");

  return (
    <>
      {!token && <Navigate replace to="/"></Navigate>}

      {token && (
        <Row>
          <Col xs={3}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Movie title</Card.Title>
                <Card.Text>Description</Card.Text>
                <Button variant="primary">View detail</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Routes;
