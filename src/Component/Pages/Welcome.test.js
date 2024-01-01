import React from 'react';
import { render,screen ,fireEvent,waitFor} from "@testing-library/react";
import Welcome from "./Welcome";
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from "react-router-dom"; 

describe('Welcome component',()=>{

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

  test('renders Complete now link and triggers handleCompleteProfile on click', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Welcome />
        </Provider>
      </BrowserRouter>
    );
  
    const completeProfileLink = screen.getByText('Complete now');
    expect(completeProfileLink).toBeInTheDocument();
  
    fireEvent.click(completeProfileLink);
  
    // Check if handleCompleteProfile is triggered and redirects to /ProfilePage
    await waitFor(() => {
      expect(window.location.pathname).toBe('/ProfilePage');
    });
  });

})



