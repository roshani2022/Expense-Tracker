import React, { useEffect, useRef } from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";
const ProfilePage = () => {
  const idToken = useSelector((state) => state.auth.token);

  const nameRef = useRef("");
  const photoRef = useRef("");

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-KuNBIcej1kXNRbQ4NAShkU3iwVjeguA";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log(data);
        console.log(data.displayName);
        nameRef.current.value = data.displayName;
        photoRef.current.value = data.photoUrl;
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [idToken,url]);

  const profileSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredURL = photoRef.current.value;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: enteredName,
          photoUrl: enteredURL,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alert("updaed successfully");

      console.log(data);
    } catch (err) {
      console.log(err.message);
      alert("something went wrong");
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col>
            <p>Winners never quit,Quitters never win.</p>
          </Col>
          <Col className="d-flex justify-content-end">
            <div
              style={{
                background: "gray",
                borderRadius: "25px",
                fontSize: "12px",
              }}
            >
              <p style={{ margin: "0" }}>
                Your profile is 64% completed. A complete profile has higher
                chances of landing a job.
                <Button
                  variant="link"
                  style={{ textDecoration: "none", margin: "none" }}
                >
                  Complete now
                </Button>
              </p>
            </div>
          </Col>
        </Row>
        <hr></hr>
      </div>
      <Container style={{ marginRight: "15px" }}>
        <Row className="mt-2 mb-2">
          <Col style={{ fontWeight: "bold", fontSize: "20px" }}>
            Contact Details
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-danger">Danger</Button>
          </Col>
        </Row>
        <Form onSubmit={profileSubmitHandler}>
          <Row className="mb-3">
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                <FaGithub size={32} color="black" /> Full Name:
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="text" ref={nameRef} />
              </Col>
              <Form.Label column sm={2}>
                <FaGlobe size={32} color="black" /> Profile Photo URL
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="text" ref={photoRef} />
              </Col>
            </Form.Group>
          </Row>
          <Button variant="danger" type="submit">
            Update
          </Button>
        </Form>
        <hr></hr>
      </Container>
    </>
  );
};
export default ProfilePage;
