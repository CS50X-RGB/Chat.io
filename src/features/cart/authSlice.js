import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialAuthState = {
  isAuth: Cookies.get("isAuth") === "true" || false,
  token: Cookies.get("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      if (token) {
        state.token = token;
        state.isAuth = true;
        // Store authentication state in cookies
        Cookies.set("token", token);
        Cookies.set("isAuth", true);
      } else {
        console.error("Token not provided in login action payload.");
      }
    },
    logout: (state) => {
      state.token = undefined;
      state.isAuth = false;
      // Clear authentication state from cookies
      Cookies.remove("token");
      Cookies.remove("isAuth");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
