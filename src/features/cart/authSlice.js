import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = JSON.parse(localStorage.getItem("auth")) || false;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: initialAuthState,
  },
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      localStorage.setItem("auth", true);
    },
    logout: (state, action) => {
      state.isAuth = false;
      localStorage.setItem("auth", false);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
