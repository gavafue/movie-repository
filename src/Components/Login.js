const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail = // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email === "" || password === "") {
      console.log("Los campos no pueden estar vacios");
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      console.log("Formato de email invalido");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      console.log("Credenciales invalidas");
      return;
    }
    console.log("Informacion lista");
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
