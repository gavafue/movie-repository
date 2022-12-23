import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import NavbarNotLogged from "./NavbarNotLogged";
import { useFormik } from "formik";
import * as yup from "yup";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const MySwal = withReactContent(swAlert);
  const navigate = useNavigate();
  const registerFirebase = (email, password, firstName, lastName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Done!",
          text: "You now registered in Gabiflix!",
        });
        updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
        }).catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops!...",
            text: `There is an error: ${error}`,
          });
        });
        navigate("/home");
      })
      .catch((err) =>
        MySwal.fire({
          icon: "error",
          title: "Oops!...",
          text: `There is an error: ${err}`,
        })
      );
  };
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .matches(/^\S*$/, "Email can not contain blank spaces")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .matches(/^\S*$/, "Password can not contain blank spaces")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    firstName: yup
      .string("Enter your password")
      .matches(/^\S*$/, "First name can not contain blank spaces")
      .required("First name is required"),
    lastName: yup
      .string("Enter your password")
      .matches(/^\S*$/, "Last name can not contain blank spaces")
      .required("Last name is required"),
    confirmPassword: yup
      .string("Enter your password")
      .matches(/^\S*$/, "Confirm password can not contain blank spaces")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Last name is required"),
  });
  const submitEvent = (values) => {
    const email = values.email;
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;
    registerFirebase(email, password, firstName, lastName);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => submitEvent(values),
  });
  return (
    <>
      <NavbarNotLogged />
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "white", margin: "40px auto 40px" }}
      >
        <CssBaseline />
        <div>
          <Avatar className="text-center mx-auto">
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            className="text-center mx-auto"
            component="h1"
            variant="h5"
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            style={{ backgroundColor: "white" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm your Password"
                  type="password"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Box mt={5}></Box>
      </Container>
      <Footer />
    </>
  );
};
export default Register;
