import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense";

const ExpenseForm = () => {
  let url =
    "https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses.json";

  const dispatch = useDispatch();
  const editedExpense = useSelector((state) => state.expenses.editedExpense);
  const expenses = useSelector((state) => state.expenses.expenses);

  const [amount, setAmount] = useState(
    editedExpense ? editedExpense.amount : ""
  );
  const [detail, setDetail] = useState(
    editedExpense ? editedExpense.detail : ""
  );
  const [category, setCategory] = useState(
    editedExpense ? editedExpense.category : "Food"
  );

  useEffect(() => {
    setAmount(editedExpense ? editedExpense.amount : "");
    setDetail(editedExpense ? editedExpense.detail : "");
    setCategory(editedExpense ? editedExpense.category : "Food");
  }, [editedExpense]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();
          console.log("get", data);

          if (data) {
            const expensesData = Object.entries(data).map(([id, expense]) => ({
              id,
              ...expense,
            }));

            dispatch(expenseActions.setExpenses(expensesData));
          } else {
            dispatch(expenseActions.setExpenses([]));
          }
        } else {
          console.log("Failed to fetch data:", res.status);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    getData();
  }, [dispatch]);

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

    if (editedExpense) {
      // Handle update logic here
      const updatedExpense = {
        ...editedExpense,
        amount: amount,
        detail: detail,
        category: category,
      };

     

      try {
        const res = await fetch(
          `https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses/${updatedExpense.id}.json`,
          {
            method: "PUT", // Use PUT method for updating
            body: JSON.stringify(updatedExpense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

       

        if (res.ok) {
          dispatch(expenseActions.updateExpenses(updatedExpense));

          console.log("Expense updated successfully");
          alert("Expense updated successfully");
        } else {
          throw new Error("Failed to update expense");
        }
        
      } catch (err) {
        console.log(err);
        alert("Failed to update expense");
      }
    } else {
      let newExpense = {
        amount,
        detail,
        category,
      };
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        });
       
        if (res.ok) {

          const data = await res.json();
          newExpense.id = data.name;

          console.log(data.name);

          dispatch(expenseActions.addExpenses([...expenses, newExpense]));
          
          console.log("expenses context", expenses);
        } else {
          console.log(res.error);
        }
      } catch (error) {
        console.log(error);
      }
     
    }

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
            value={amount || ""}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupText">
          <Form.Label>Expense Detail</Form.Label>
          <Form.Control
            type="text"
            placeholder="ExpenseDetail"
            onChange={detailHandler}
            value={detail || ""}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridCategory">
          <Form.Label>Expense Category</Form.Label>
          <Form.Select onChange={categoryHandler} value={category || "Food"}>
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

