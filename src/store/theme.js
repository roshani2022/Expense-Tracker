import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
//  backgroundColor:''
isDark:false
}

const themeSlice = createSlice({
    name:'theme',
   initialState:initialThemeState,
   reducers:{
     toggleTheme:(state)=>{
      // state.backgroundColor = state.backgroundColor === 'white' ? 'darkgray' : 'white';
       state.isDark=!state.isDark
     }
     
   }
  
})



export const themeActions = themeSlice.actions

export default themeSlice.reducer