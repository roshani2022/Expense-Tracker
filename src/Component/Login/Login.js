import React, { useRef } from "react";
import { Form, Card, Button, Container } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  console.log(login);
  const emailRef = useRef({ current: "" });
  const passwordRef = useRef({ current: "" });
  const confirmPasswordRef = useRef({ current: "" });

  const switchAuthModeHandler = () => {
    dispatch(authActions.setLogin());
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    let url;

    if (!login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-KuNBIcej1kXNRbQ4NAShkU3iwVjeguA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-KuNBIcej1kXNRbQ4NAShkU3iwVjeguA";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage;
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (!login) {
          console.log("Login successful!");
        } else {
          console.log("Signup successful!");
        }

        dispatch(
          authActions.login({ idToken: data.idToken, email: data.email })
        );
        history.replace("/Welcome");
      })
      .catch((err) => {
        console.error("Error during authentication:", err);
        alert(err.message);
      });

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card style={{ width: "25rem" }} className="mx-auto  mt-5">
        <h1 className="text-center mb-4">{!login ? "Login" : "Sign Up"}</h1>
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
          {login ? (
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label className="text-start">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>
          ) : (
            ""
          )}
          <div className="d-flex flex-column align-items-center mt-3">
            <Button
              variant="primary"
              type="submit"
              className="mb-2 align-items-center"
            >
              {!login ? "Login" : "SignUp"}
            </Button>

            {!login && (
              <Link to="/ForgotPassWord">
                <Button variant="link" className="mb-2">
                  Forgot Password
                </Button>
              </Link>
            )}
          </div>
        </Form>
      </Card>
      <Button type="button" onClick={switchAuthModeHandler} className="mt-3">
        {!login ? "Have an account?Login" : " Don't Have an account SignUp"}
      </Button>
    </Container>
  );
};
export default Login;
