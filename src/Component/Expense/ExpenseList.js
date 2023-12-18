import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { FaDeleteLeft, FaPenToSquare } from "react-icons/fa6";
import ExpenseContext from "../Store/ExpenseContext";

const ExpenseList = () => {
  const expenseContext = useContext(ExpenseContext);

  const handleEditButtonClick = (id) => {
    expenseContext.editExpense(id);
    console.log(id)
  };


  const showExpense = (expenses) => {
    console.log(expenses)
    return expenses.map((expense,index) => (
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
        <Button onClick={() =>expenseContext.deleteExpense(expense.id)}>
          <FaDeleteLeft style={{ fontSize: "1.5rem", color: "white" }} />
        </Button>
        {" "}<Button onClick={()=>handleEditButtonClick(expense.id)}>
         <FaPenToSquare style={{ fontSize: "1.5rem" }} />
          </Button> 
      </li>
    ));
  };

  return (
    <>
      {expenseContext.expenses.length > 0 && (
        <Card
          className="mt-3 mx-auto"
          style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <ul>{showExpense(expenseContext.expenses)}</ul>
        </Card>
      )}
    </>
  );
};

export default ExpenseList;
