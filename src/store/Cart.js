import { createSlice } from "@reduxjs/toolkit";


const initialCartState = {
    showCart : false,
     cartList:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        showCart:(state)=>{
            state.showCart = !state.showCart
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;