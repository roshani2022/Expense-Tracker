import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  totalAmount:0,
  editedexpenses: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    setExpenses(state, action) {
      
      state.expenses = action.payload;
      state.totalAmount = calculateTotalAmount(action.payload);
    },
    addExpenses(state, action) {
      state.expenses = action.payload;
      state.totalAmount = calculateTotalAmount(action.payload)
    },
    removeExpenses(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      state.totalAmount = calculateTotalAmount(state.expenses);
    },
    editExpenses(state, action) {
      state.editedExpense = action.payload;
    },
    updateExpenses(state, action) {
      state.expenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
      state.totalAmount = calculateTotalAmount(state.expenses);
    },
    setTotalAmount(state) {
      state.totalAmount = calculateTotalAmount(state.expenses);
    },
  },
});

const calculateTotalAmount = (expenses) => {
  return expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );
};

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
