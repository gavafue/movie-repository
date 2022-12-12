import React from "react";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";
import { useAuthStatus } from "../Hooks/useAuthStatus";
const MySwal = withReactContent(swAlert);

const Login = () => {
  const { loggedIn } = useAuthStatus();

  const navigate = useNavigate();
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Este campo tiene que tener un formato de email")
      .min(1)
      .required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido"),
  });

  const loginWithCredentials = async (email, password) => {
    try {
      const userLogged = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("userLogged", JSON.stringify(userLogged.user));
      navigate("/list");
      MySwal.fire({
        icon: "success",
        title: "Done!",
        text: "You now are in!",
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Ooops!...",
        text: "The email or password were incorrect",
      });
    }
  };

  const submitHandler = (values) => {
    const email = values.email;
    const password = values.password;
    loginWithCredentials(email, password);
  };
  if (loggedIn === undefined) {
    return <p>Loading</p>;
  } else if (loggedIn === true) {
    return <Navigate to="/home"></Navigate>;
  } else {
    return (
      <Formik
        validationSchema={loginSchema}
        onSubmit={submitHandler}
        initialValues={{ email: "", password: "" }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <Container>
            <Row className="vh-100 justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <Card className="shadow">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2 text-uppercase ">Log in</h2>
                      <p className=" mb-5">
                        Please enter your email and password!
                      </p>
                      <div className="mb-3">
                        <Form onSubmit={handleSubmit}>
                          <Row className="mb-3">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                type="text"
                                name="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                isInvalid={errors.email}
                                isValid={(values.email !== "") & !errors.email}
                              />
                              <Form.Control.Feedback
                                type="invalid"
                                style={{ marginTop: "-10px" }}
                              >
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                isInvalid={errors.password}
                                isValid={
                                  (values.password !== "") & !errors.password
                                }
                              />
                              <Form.Control.Feedback
                                type="invalid"
                                style={{ marginTop: "-10px" }}
                              >
                                {errors.password}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <p className="small">
                              <a className="text-primary" href="#!">
                                Forgot password?
                              </a>
                            </p>
                          </Form.Group>
                          <div className="d-grid">
                            <Button variant="primary" type="submit">
                              Login
                            </Button>
                          </div>
                        </Form>
                        <div className="mt-3">
                          <p className="mb-0  text-center">
                            Don't have an account?{" "}
                            <a
                              href="https://github.com/gavafue"
                              className="text-primary fw-bold"
                            >
                              Sign Up
                            </a>
                          </p>
                        </div>
                        <Alert variant="secondary" className="d-block">
                          If you want to try the aplication, use the following
                          credentials: Email: email: try@gabiflix.org ||
                          Password: gabiflix
                        </Alert>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    );
  }
};

export default Login;
