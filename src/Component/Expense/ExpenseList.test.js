import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExpenseList from './ExpenseList';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

describe('ExpenseList Component', () => {
  test('render ExpenseList with no expenses', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ExpenseList />
        </Provider>
      </BrowserRouter>
    );

    // Assert that the component renders correctly with no expenses
    expect(screen.getByText('No expenses to show.')).toBeInTheDocument();
  });

 
  
});
