import React from 'react';
import { render,screen } from "@testing-library/react";
import Welcome from "./Welcome";
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from "react-router-dom"; 

test('renders Welcome To Expense Tracker!!! as a text', async () => {
  render(
    <BrowserRouter> {/* Wrap your component with BrowserRouter */}
      <Provider store={store}>
        <Welcome />
      </Provider>
    </BrowserRouter>
  );

  const welcomeElement = screen.getByText('Welcome To Expense Tracker!!!');
  expect(welcomeElement).toBeInTheDocument();
});