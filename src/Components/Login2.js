import * as React from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "./Loader";
import NavbarNotLogged from "./NavbarNotLogged";
import Footer from "./Footer";
import { Alert } from "antd";

const theme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginForm = () => {
  const MySwal = withReactContent(swAlert);
  const navigate = useNavigate();

  const loginWithCredentials = async (email, password) => {
    try {
      const userLogged = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("userLogged", JSON.stringify(userLogged.user));
      navigate("/home");
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

  const submitEvent = (values) => {
    const email = values.email;
    const password = values.password;
    loginWithCredentials(email, password);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => submitEvent(values),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "white" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Alert
            message="Informational Notes"
            description={`If you want to enter and you have not account use this credentials: \n 
            Email: gabiflix@try.org \n
            Password: gabiflix`}
            type="info"
            showIcon
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const Login2 = () => {
  const { loggedIn } = useAuthStatus();
  if (loggedIn === undefined) {
    return <Loader />;
  } else if (loggedIn === true) {
    return <Navigate to="/home"></Navigate>;
  } else {
    return (
      <>
        <NavbarNotLogged />
        <LoginForm />
        <Footer />
      </>
    );
  }
};

export default Login2;
