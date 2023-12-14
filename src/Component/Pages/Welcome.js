import React from "react";
import { Row, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const history = useHistory();
  const handleCompleteProfile = () => {
   
    history.replace("/ProfilePage");
  };
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
      </div>
    </>
  );
};

export default Welcome;
