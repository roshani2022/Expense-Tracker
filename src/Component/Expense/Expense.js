
import React,{useEffect, useState} from "react";
import ExpenseForm from "./ExpneseForm";
import ExpenseList from "./ExpenseList";

const Expense = () => {
   
    const [expenseList, setExpenseList] = useState([]);
    const [isExpense, setIsExpense] = useState(false);

    let url =
    "https://expense-tracker-c2f34-default-rtdb.firebaseio.com/expenses.json";

    useEffect(() => {
        const getData = async () => {
          try {
            const res = await fetch(url);
    
            if (res.ok) {
              const data = await res.json();
              // Update the state with the fetched data
            //   setExpenseList(data ? Object.values(data) : []);
            setExpenseList(data ? Object.values(data) : []);
              setIsExpense(true);
            } else {
              console.log("Failed to fetch data:", res.status);
            }
          } catch (err) {
            console.log("Error fetching data:", err);
          }
        };
    
        getData();
      }, []);

    const addExpenseHandler = (amount,detail,category) => {
        const newExpense = {
            amount: amount,
            detail: detail,
            category: category,
            id: Math.random().toString(),
          };

          const updatedExpenseList = [...expenseList, newExpense];
          setExpenseList(updatedExpenseList)
          setIsExpense(true)
    }

    return (
        <>
         <ExpenseForm onAdd={addExpenseHandler}/>
         <ExpenseList expenses={expenseList} onExpense={isExpense}/>
        </>
    )
}
export default Expense;