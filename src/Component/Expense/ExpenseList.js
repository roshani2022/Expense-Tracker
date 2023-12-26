import React, { useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { FaDeleteLeft,FaPenToSquare,} from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);

  const backgroundColor = useSelector((state) => state.theme.backgroundColor);

  document.body.style.backgroundColor = backgroundColor;

  useEffect(() => {
    dispatch(expenseActions.setTotalAmount());
  }, [dispatch, expenses]);

  const handleEditButtonClick = (id) => {
    const editedExpense = expenses.find((expense) => expense.id === id);
    dispatch(expenseActions.editExpenses(editedExpense));
    console.log(editedExpense);
  };

  const handdeleteButtonClick = async (id) => {
    dispatch(expenseActions.removeExpenses(id));
    console.log("Expense deleted successfully");

    try {
      const res = await fetch(
        `https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Expense deleted successfully");
      } else {
        throw new Error("Failed to delete expense");
      }
    } catch (err) {
      console.log(err);
      // Revert the state in case of an error

      alert("Failed to delete expense");
    }
  };
  
  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = ["Detail", "Category", "Amount"];
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = String(row[header.toLowerCase()]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const downloadCSV = (csvData) => {
    const blob = new Blob([csvData]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "expenses.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadHandler = () => {
    const csvData = convertToCSV(expenses);
    downloadCSV(csvData);
  };

 
  const showExpense = (expenses) => {
    return (
      <>
        <thead>
          <tr>
            <th>Category</th>
            <th>Detail</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.category}</td>
              <td>{expense.detail}</td>
              <td>{expense.amount}</td>
              <td>
                <Button onClick={() => handdeleteButtonClick(expense.id)}>
                  <FaDeleteLeft
                    style={{ fontSize: "1.5rem", color: "white" }}
                  />
                </Button>{" "}
                <Button onClick={() => handleEditButtonClick(expense.id)}>
                  <FaPenToSquare style={{ fontSize: "1.5rem" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <>
      <Card
        className="mt-3 mx-auto"
        style={{ width: "450px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        {expenses && expenses.length > 0 ? (
          <>
            <Table striped bordered hover responsive>
              {showExpense(expenses)}
              <tfoot>
                <tr>
                  <td colSpan="3">Total Amount:</td>
                  <td>{totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </Table>
            <div className="justify-content-end">
              <Button
                variant="primary"
                className="mt-2 mb-2 ms-2"
                onClick={downloadHandler}
              >
                Download Csv File
              </Button>
            </div>
          </>
        ) : (
          <div style={{ fontWeight: "bold" }} className="mt-2 mb-2 ms-2">
            No expenses to show.
          </div>
        )}
      </Card>
    </>
  );
};

export default ExpenseList;
