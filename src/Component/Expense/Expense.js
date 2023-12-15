
import React,{useState} from "react";
import ExpenseForm from "./ExpneseForm";
import ExpenseList from "./ExpenseList";

const Expense = () => {
   
    const [expenseList, setExpenseList] = useState([]);
    const [isExpense, setIsExpense] = useState(false);

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