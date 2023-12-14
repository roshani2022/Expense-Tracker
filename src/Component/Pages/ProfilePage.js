import React,{useContext, useRef} from "react";
import { Button, Col, Row, Container,Form } from "react-bootstrap";
import LoginContext from "../Store/LoginContex";
import {FaGithub,FaGlobe} from "react-icons/fa"

const ProfilePage = () => {

  const nameRef = useRef("")
  const photoRef = useRef("")
 const loginCtx = useContext(LoginContext)

  const profileSubmitHandler = async(event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredURL = photoRef.current.value;

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-KuNBIcej1kXNRbQ4NAShkU3iwVjeguA'
    try{
      const response = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
          idToken:loginCtx.token,
          displayName: enteredName,
          photoUrl: enteredURL,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
       })

       const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
   
  }

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
      <Container style={{marginRight:"15px"}}>
        <Row className="mt-2 mb-2">
          <Col style={{fontWeight:"bold",fontSize:"20px"}}>Contact Details</Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-danger">Danger</Button>
          </Col>
        </Row>
         <Form onSubmit={profileSubmitHandler}>
      <Row className="mb-3">
        <Form.Group as={Row} controlId="formHorizontalEmail" >
        <Form.Label column sm={2}>
        <FaGithub size={32} color="black" />{" "}
          Full Name:
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="text" ref={nameRef}/>
        </Col>
        <Form.Label column sm={2}>
        <FaGlobe size={32} color="black" />{" "}
          Profile Photo URL
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="text" ref={photoRef} />
        </Col>
      </Form.Group>
      </Row>
       <Button variant="danger" type="submit">Update</Button>
    </Form>
    <hr></hr>
      </Container>
      
    </>
  );
};
export default ProfilePage;
