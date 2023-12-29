import React,{useState} from "react";
import ExpenseForm from "./ExpneseForm";
import ExpenseList from "./ExpenseList";

const Expense = () => {

  const [showExpenseList, setShowExpenseList] = useState(false);

  const showExpenseListHandler = () => {
    setShowExpenseList(true);
  };

  return (
    <>
      <ExpenseForm />
      <ExpenseList list={showExpenseList} onshow={showExpenseListHandler}  />
      </>
  );
};
export default Expense;
