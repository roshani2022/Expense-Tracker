import React, { useContext} from "react";
import {NavLink} from 'react-router-dom'
import { Navbar, Button,Nav } from "react-bootstrap";
import LoginContext from "../Store/LoginContex";

const Header = () => {
  const loginCtx = useContext(LoginContext);

  const isLoggedIn = loginCtx.isLoggedIn;

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
            margin: "auto",
          }}
        >
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              marginRight: "1.5rem",
            }}
          >
            HOME
          </NavLink>

          <NavLink
            to="/Login"
            style={{
              textDecoration: "none",
              color: "white",
              marginRight: "1.5rem",
            }}
          >
            LOGIN
          </NavLink>

          <NavLink
            to="/Welcome"
            style={{
              textDecoration: "none",
              color: "white",
              marginRight: "1.5rem",
            }}
          >
            WELCOME
          </NavLink>

          {isLoggedIn && (
            
              <Button
                variant="link"
                onClick={() => loginCtx.logout()}
                style={{ textDecoration: "none", color:"white",fontWeight: "bold" }}
              >
                LOGOUT
              </Button>
           
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
