import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import Expense from './Expense';

describe('Expense Component', () => {
  test('renders ExpenseForm component', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Expense />
        </Provider>
      </BrowserRouter>
    );

    // Check if elements or text content within ExpenseForm are present
    expect(screen.getByLabelText('Expense Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Expense Detail')).toBeInTheDocument();
    expect(screen.getByLabelText('Expense Category')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Expense' })).toBeInTheDocument();
  });

  test('renders ExpenseList component initially', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Expense />
        </Provider>
      </BrowserRouter>
    );

    // Check if elements or text content within ExpenseList are present
    expect(screen.getByText('No expenses to show.')).toBeInTheDocument();
    // You can add more checks based on your ExpenseList component content
  });


});
