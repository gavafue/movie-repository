import axios from "axios";
import React from "react";
import swAlert from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
const navigate = useNavigate()
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
        localStorage.setItem("token", tokenReceived);
        navigate("/list");
      });
  };
  return (
    <>
      <h2>Login form</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Email</span>
          <br />
          <input type="text" name="email"></input>
        </label>
        <br />
        <label>
          <span>Password</span>
          <br />
          <input type="password" name="password"></input>
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Login;
