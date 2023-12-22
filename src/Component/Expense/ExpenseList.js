import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaDeleteLeft, FaPenToSquare } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  let totalAmount

  if (expenses) {
           totalAmount = expenses.reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
  }

  const handleEditButtonClick = (id) => {
    const editedExpense = expenses.find((expense) => expense.id === id);
    dispatch(expenseActions.editExpenses(editedExpense));
    console.log(editedExpense);
  };

  const handdeleteButtonClick = async (id) => {
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
        dispatch(expenseActions.removeExpenses(id));
      } else {
        throw new Error("Failed to delete expense");
      }
    } catch (err) {
      console.log(err);
      // Revert the state in case of an error

      alert("Failed to delete expense");
    }
  };

  const showExpense = (expenses) => {
   
    console.log(expenses);
    return expenses.map((expense, index) => (
      <li
        key={index}
        style={{
          textDecoration: "none",
          borderBottom: "1px solid #ddd",
          padding: "10px 0",
          fontWeight: "bold",
        }}
      >
        {expense.amount} - {expense.detail} - {expense.category} -{"    "}
        <Button onClick={() => handdeleteButtonClick(expense.id)}>
          <FaDeleteLeft style={{ fontSize: "1.5rem", color: "white" }} />
        </Button>{" "}
        <Button onClick={() => handleEditButtonClick(expense.id)}>
          <FaPenToSquare style={{ fontSize: "1.5rem" }} />
        </Button>
      </li>
    ));
  };

  return (
    <>
        
        <Card
          className="mt-3 mx-auto"
          style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        > 
         {totalAmount > 10000 && (
            <div className="text-end mt-2">
              <Button variant="primary">Activate Premium</Button>
            </div>
          )}
          
         {(expenses && expenses.length > 0) ? (
        <>
          <ul>{showExpense(expenses)}</ul>
          <div
            style={{
              padding: "10px",
              fontWeight: "bold",
              borderTop: "1px solid #ddd",
            }}
          >
            Total Amount: {totalAmount.toFixed(2)}
          </div>
        </>
      ) : (
        <div style={{fontWeight:'bold'}}  className="mt-2 mb-2 ms-2">No expenses to show.</div>
      )}

        </Card>
      
    </>
  );
};

export default ExpenseList;

