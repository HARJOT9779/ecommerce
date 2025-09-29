// src/reducers/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  authToken: null,
  role:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.authToken = action.payload.token;
      state.role= action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.authToken = null;
      state.role=null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
