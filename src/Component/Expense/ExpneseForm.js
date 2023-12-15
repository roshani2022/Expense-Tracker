import React,{useState} from "react";
import { Card, Form,Button} from "react-bootstrap";

const ExpenseForm = (props) => {

    const [amount,setAmount] = useState()
    const [detail,setDetail] = useState()
    const [category,setCategory] = useState()

    const amountHandler = (event) => {
        setAmount(event.target.value)
    }
    const detailHandler = (event)=> {
        setDetail(event.target.value)
    }
    const categoryHandler = (event) => {
        setCategory(event.target.value)
    }

    const addExpenseHandler = (event) => {
       event.preventDefault()

       props.onAdd(amount,detail,category)
      setAmount("")
      setDetail("")
      setCategory("")

    }



  return (
    <Card className="mt-5 mx-auto" style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", fontWeight:"bold"}}>
      <Form onSubmit={addExpenseHandler}>
        <Form.Group className="mb-3" controlId="formGroupNumber">
          <Form.Label>Expense Amount</Form.Label>
          <Form.Control type="number" placeholder="Amount" onChange={amountHandler} value={amount} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupText">
          <Form.Label>Expense Detail</Form.Label>
          <Form.Control type="text" placeholder="ExpenseDetail" onChange={detailHandler} value={detail} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridCategory" >
          <Form.Label>Expense Category</Form.Label>
          <Form.Select defaultValue="Choose Category..." onChange={categoryHandler} value={category}>
            <option>Food</option>
            <option>Grocery</option>
            <option>Travel</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-center mt-3 mb-3">
        <Button type='submit'>Add Expense</Button>
        </div>
       
      </Form>
    </Card>
  );
};
export default ExpenseForm;
