import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import Login from "./Login";

describe("Login Component", () => {
  test("renders Login component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    // You can add more specific assertions based on your component's structure

    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("switches between Login and Sign Up modes", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    const switchButton = screen.getByText(/have an account\?login/i);

    fireEvent.click(switchButton);

    // After clicking the switch button, the mode should change
    const signUpTitle = screen.getByText(/sign up/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirm password/i);

    expect(signUpTitle).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

});
