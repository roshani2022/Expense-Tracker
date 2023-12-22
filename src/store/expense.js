import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenses : [],
    
   editedexpenses:null,
} 

const expenseSlice = createSlice({
    name :'expenses',
    initialState:initialExpenseState,
    reducers:{
        setExpenses(state, action) {
            state.expenses = action.payload;
          },
        addExpenses(state,action){
          state.expenses=action.payload
          
        },
        removeExpenses(state,action){
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        },
        editExpenses(state,action){
            state.editedExpense = action.payload;
        },
        updateExpenses(state, action) {
            state.expenses = state.expenses.map((expense) =>
              expense.id === action.payload.id ? action.payload : expense
            );
          },
        
    }
})
console.log(initialExpenseState)

export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer