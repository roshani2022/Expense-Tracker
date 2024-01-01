import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DarkMode from "./DarkMode";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";

describe("DarkMode Component", () => {
  test("toggles theme when checkbox is clicked", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DarkMode />
        </Provider>
      </BrowserRouter>
    );

   // Use the role attribute to get the checkbox
  const toggleCheckbox = screen.getByRole("checkbox");

  // Initial state should be light mode
  expect(document.body.getAttribute("data-theme")).toBe("light");

  // Click the checkbox to toggle the theme
  fireEvent.click(toggleCheckbox);

  // After clicking, the theme should be dark
  expect(document.body.getAttribute("data-theme")).toBe("dark");
  });
});
