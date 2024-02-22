import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: JSON.parse(localStorage.getItem("auth")) || false,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuth = !!action.payload;
      if (state.isAuth) {
        localStorage.setItem("auth", true);
      }
    },
    logout: (state) => {
      state.token = undefined;
      state.isAuth = false;
      localStorage.setItem("auth", false);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
