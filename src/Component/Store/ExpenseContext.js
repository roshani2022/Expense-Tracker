import React, { useState, useEffect } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);

  let url =
    "https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses.json";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();

          setExpenses(data ? Object.values(data) : []);
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
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(expenses)
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

  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;

