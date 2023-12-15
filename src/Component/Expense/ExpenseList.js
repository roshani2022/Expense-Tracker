import React from "react";
import { Card } from "react-bootstrap";

const ExpenseList = (props) => {
  return (
    <>
      {props.expenses.length > 0 ? (
        <Card className="mt-3 mx-auto" style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ listStyleType: "none", padding: "0" ,fontWeight:"bold"}}>
            {props.expenses.map((expense) => (
              <div key={expense.id} style={{ textDecoration: "none", borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                {expense.amount} - {expense.detail} - {expense.category}
              </div>
            ))}
          </div>
        </Card>
      ) : (
       ""
      )}
    </>
  );
};

export default ExpenseList;
