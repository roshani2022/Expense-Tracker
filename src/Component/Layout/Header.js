import React from "react";
import { Navbar,Nav,NavLink } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar
        sticky="top"
        expand="lg"
        bg="primary"
        variant="dark"
        style={{ height: "3rem" }}
      >
        <Nav
          style={{
            fontWeight: "bold",
            fontFamily: "fangsong",
            textDecoration: "none",
            margin:"auto"
          }}
        >
          <NavLink
            to="/Login"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            LOGIN
          </NavLink>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
