import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import DarkMode from "../Layout/DarkMode";

const Header = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isAuthenticated);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const isDark = useSelector((state) => state.theme.isDark);

  const [premiumActivated, setPremiumActivated] = useState(false);

  const handleActivatePremium = () => {
    setPremiumActivated(true);
  };

  return (
    <>
      <Navbar
        sticky="top"
        expand="lg"
        bg={isDark ? "dark" : "primary"}
        variant="dark"
        style={{ height: "3rem" }}
      >
        <Nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
                  marginRight: "1.5rem",
                }}
              >
                LOGOUT
              </Button>
            </NavLink>
          )}

          {login && totalAmount >= 10000 && !premiumActivated && (
            <Button
              variant="link"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                marginRight: "1.5rem",
              }}
              onClick={handleActivatePremium}
            >
              ACTIVATE PREMIUM
            </Button>
          )}
          {login && totalAmount >= 10000 && premiumActivated && (
          <DarkMode style={{marginRight:"1.5rem"}}/>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
