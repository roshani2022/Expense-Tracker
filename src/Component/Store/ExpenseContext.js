import React, { useState, useEffect } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  editedExpense:null,
  editExpense:()=>{},
  updateExpense:()=>{},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [editedExpense,setEditedExpense] = useState(null)

  let url =
    "https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses.json";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();
          console.log('get',data)

        if(data){
          const expensesData = Object.entries(data).map(([id, expense]) => ({
            id,
            ...expense,
          }));

          setExpenses(expensesData);
        }
        else {
          setExpenses([])
        }
        } else {
          console.log("Failed to fetch data:", res.status);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    getData();
  }, []);

  const addExpenseHandler = async (expense) => {

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();

        console.log(data.name)

        setExpenses((prevExpense) => [
          ...prevExpense,
          {
            id: data.name, // Assuming the response has an ID field
            amount: expense.amount,
            detail: expense.detail,
            category: expense.category,
            
          },
          
        ]);
        console.log('expenses context',expenses)
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  const deleteExpenseHandler = async (id) => {
    const existingExpense = expenses.find((expense) => expense.id === id);
    const updatedExpenses = expenses.filter(
      (prevExpense) => prevExpense.id !== id
    );
    console.log(existingExpense.id)

    setExpenses(updatedExpenses);

    try {
      const res = await fetch(
        `https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Expense deleted successfully");
        alert("Expense deleted successfully");
      } else {
        throw new Error("Failed to delete expense");
      }
    } catch (err) {
      console.log(err);
      // Revert the state in case of an error
      setExpenses((prevExpenses) => [...prevExpenses, existingExpense]);
      alert("Failed to delete expense");
    }
  };

  const editExpenseHandler = (id) => {
    const editedExpense = expenses.find((expense) => expense.id === id);
    setEditedExpense(editedExpense);
    console.log(editedExpense)
  }

  const updateExpenseHandler = async(updatedExpense) => {
    try {
      const res = await fetch(`https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses/${updatedExpense.id}.json`, {
        method: "PUT", // Use PUT method for updating
        body: JSON.stringify(updatedExpense),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.ok) {
        // Update the state with the new expense data
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          )
        );
  
        console.log("Expense updated successfully");
        alert("Expense updated successfully");
      } else {
        throw new Error("Failed to update expense");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to update expense");
    }
  }
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    editedExpense:editedExpense,
    editExpense:editExpenseHandler,
    updateExpense:updateExpenseHandler
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;