import React,{useState} from "react";
import ExpenseForm from "./ExpneseForm";
import ExpenseList from "./ExpenseList";
import { ExpenseContextProvider } from "../Store/ExpenseContext";

const Expense = () => {

  const [showExpenseList, setShowExpenseList] = useState(false);

  const showExpenseListHandler = () => {
    setShowExpenseList(true);
  };

  return (
    <ExpenseContextProvider>
      <ExpenseForm />
      <ExpenseList list={showExpenseList} onshow={showExpenseListHandler}  />
    </ExpenseContextProvider>
  );
};
export default Expense;
