import React, { useRef, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassWord = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  const forgotPassWordHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    const email = emailRef.current.value;
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-KuNBIcej1kXNRbQ4NAShkU3iwVjeguA",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Container className="d-flex  flex-column  justify-content-center mt-5">
      <Form onSubmit={forgotPassWordHandler}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter the email with which you have register</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            ref={emailRef}
            required
          />
        </Form.Group>
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <Button type="submit">Send Link</Button>
        )}
      </Form>
      <div>
        <p className="mt-2">
          AlreadyHave an account?<Link to="/Login" style={{ textDecoration: "none"}}>Login</Link>
        </p>
      </div>
    </Container>
  );
};
export default ForgotPassWord;
