import React, { useRef, useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = passwordRef.current.value;

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-KuNBIcej1kXNRbQ4NAShkU3iwVjeguA",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword:confirmPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("User has successfully signed up")
        } else {
          return res.json().then((data) => {
             //let errorMessage = "Authentication Failed!";
             let errorMessage
            if(data && data.error && data.error.message) {
              errorMessage = data.error.message
            }
            alert(errorMessage);
          });
        }
      });
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <>
      <Card style={{ width: "25rem" }} className="mx-auto mt-5">
        <h1 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-left">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-start">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label className="text-start">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mb-2">
            {isLogin ? "Login" : "SignUp"}
          </Button>
        </Form>
      </Card>
      <Button
        type="button"
        onClick={switchAuthModeHandler}
        className="mt-3"
      >
        Have an account?Login
      </Button>
    </>
  );
};
export default Login;
