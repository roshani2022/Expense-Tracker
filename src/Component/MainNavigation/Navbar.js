import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isAuthenticated);

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
          {!login && (
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
          )}

          {login && (
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
          )}

          {login && (
            <NavLink to="/Login">
              <Button
                variant="link"
                onClick={() => dispatch(authActions.logout())}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                LOGOUT
              </Button>
            </NavLink>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
