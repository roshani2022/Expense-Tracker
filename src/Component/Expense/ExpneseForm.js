import React, {useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const ExpenseForm = (props) => {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("Food");

  

  let url =
    "https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses.json";

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };
  const detailHandler = (event) => {
    setDetail(event.target.value);
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  

  const addExpenseHandler = async (event) => {
    event.preventDefault();

    let expenses = { amount, detail, category };

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(expenses),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);

        setAmount("");
        setDetail("");
        setCategory("Food");
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }

    props.onAdd(amount, detail, category);
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
      <Form onSubmit={addExpenseHandler}>
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
