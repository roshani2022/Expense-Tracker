import React, { useContext } from "react";
import { Row, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LoginContext from "../Store/LoginContex";

const Welcome = () => {
  const history = useHistory();

  const loginCtx = useContext(LoginContext)
  
let url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-KuNBIcej1kXNRbQ4NAShkU3iwVjeguA'


  const handleCompleteProfile = () => {
   
    history.replace("/ProfilePage");
  };
  const emailVerificationHandler = async() => {
     try{
      const res = await fetch(url,{
        method:"POST",
        body: JSON.stringify({
          idToken:loginCtx.token,
          requestType:"VERIFY_EMAIL",
        }),

        headers: {
          "Content-Type": "application/json",
        },
      })

      if(!res.ok){
        const errorData = await res.json()
        console.log('error', errorData)
        alert('invalid,credential')
      }
      else{
        const data = await res.json()
      console.log(data)
      alert('please check your email')
      }

      
     }catch(error){
       console.log(error)
     }
  }
  return (
    <>
      <div>
        <Row>
          <Col>
            <p>Welcome To Expense Tracker!!!</p>
          </Col>
          <Col className="d-flex justify-content-end">
          <div style={{ background: "lightbrown", borderRadius: "25px", padding: "10px" }}>
              <p style={{ margin: "0" }}>
                Your profile is incomplete.
                <Button variant="link" style={{ textDecoration: "none", margin: "0" }}
                onClick={handleCompleteProfile}>
                  Complete now
                </Button>
              </p>
            </div>
          </Col>
        </Row>
        <hr></hr>
        <div className="d-flex justify-content-end me-3">
        <Button onClick={emailVerificationHandler}>Verify Email</Button>
        </div>
        
      </div>
    </>
  );
};

export default Welcome;
