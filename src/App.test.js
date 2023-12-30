import React from "react";
import { render,screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

test('renders Home component for the root path', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // You might want to update this to match content from your Home component
  const homeElement = screen.getByText(/This is a home page/i);

  expect(homeElement).toBeInTheDocument();
});



