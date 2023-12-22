import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated:false,
  token: localStorage.getItem("user"),
  userEmail: localStorage.getItem("userEmail"),
};

console.log('auth',initialAuthState.token)

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.isAuthenticated =true;
      state.userEmail = action.payload.email;
      localStorage.setItem("user", action.payload.idToken);
      localStorage.setItem("userEmail", action.payload.email);

      console.log(state.token)
    },
    logout(state) {
      state.token = null;
      state.userEmail = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      
    },
    setLogin(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },

  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
