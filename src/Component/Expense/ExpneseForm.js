import React, { useState, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import ExpenseContext from "../Store/ExpenseContext";

const ExpenseForm = () => {
  const expenseContext = useContext(ExpenseContext);
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("Food");

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };
  const detailHandler = (event) => {
    setDetail(event.target.value);
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let expenses = {
     
      amount,
      detail,
      category,
    };

    expenseContext.addExpense(expenses);

    console.log(expenses);

    setAmount("");
    setDetail("");
    setCategory("Food");
  };

  return (
    <Card
      className="mt-5 mx-auto"
      style={{
        width: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontWeight: "bold",
      }}
    >
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupNumber">
          <Form.Label>Expense Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Amount"
            onChange={amountHandler}
            value={amount}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupText">
          <Form.Label>Expense Detail</Form.Label>
          <Form.Control
            type="text"
            placeholder="ExpenseDetail"
            onChange={detailHandler}
            value={detail}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridCategory">
          <Form.Label>Expense Category</Form.Label>
          <Form.Select onChange={categoryHandler} value={category}>
            <option>Food</option>
            <option>Grocery</option>
            <option>Travel</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-center mt-3 mb-3">
          <Button type="submit">Add Expense</Button>
        </div>
      </Form>
    </Card>
  );
};
export default ExpenseForm;
