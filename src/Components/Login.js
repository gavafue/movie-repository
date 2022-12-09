import axios from "axios";
import React from "react";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
const MySwal = withReactContent(swAlert);
const Login = () => {
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // eslint-disable-next-line
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email === "" || password === "") {
      MySwal.fire({
        icon: "info",
        title: "Oops...",
        text: "The inputs can not be empty!.",
      });
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "The email format is invalid!",
      });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      MySwal.fire({
        icon: "error",
        title: "Ooops!...",
        text: "The credentials are not valid! Check it and try again",
        footer: '<a href="">Recover your password?</a>',
      });
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        MySwal.fire({
          icon: "success",
          title: "Done",
          text: "You are in!",
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
          If you want to try the aplication, use the following credentials:
          Email: email: challenge@alkemy.org || Password: react
        </Alert>
      </Container>
    );
  }
};

export default Login;
