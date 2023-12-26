import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import DarkMode from "../Layout/DarkMode";
import { FaCartShopping } from "react-icons/fa6";

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
              }}
              onClick={handleActivatePremium}
            >
              ACTIVATE PREMIUM
            </Button>
          )}
          {login && totalAmount >= 10000 && premiumActivated && <DarkMode />}
          {login && (
            <NavLink to="/Cart"
            
            >
              <Button variant="link"
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "38rem",
                
              }} 
              >
                <FaCartShopping />
              </Button>
            </NavLink>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
