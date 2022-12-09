import axios from "axios";
import React from "react";
import swAlert from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
const Login = () => {
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail = // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email === "" || password === "") {
      swAlert("The input can not be empty");
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swAlert("This mail is invalid");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert("Email or password were not correct");
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert({
          title: "Good job!",
          text: "You're in!",
          icon: "success",
        });
        const tokenReceived = res.data.token;
        sessionStorage.setItem("token", tokenReceived);
        navigate("/list");
      });
  };

  if (token) {
    return <Navigate replace to="/list"></Navigate>;
  }
  if (!token) {
    return (
      <Container style={{ width: "50%" }}>
        <h2>Login form</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="text" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Alert variant="secondary">
          If you want to try the aplication, use the following credentials: Email:
         email: challenge@alkemy.org || Password: react
        </Alert>
      </Container>
    );
  }
};

export default Login;
