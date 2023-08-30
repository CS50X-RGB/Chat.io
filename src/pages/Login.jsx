import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/cart/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";
import { toast } from "react-hot-toast";

function reducer(state, action) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

export function Login() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };

  const [state, dispatchReducer] = useReducer(reducer, initialState);

  const handleEmailChange = (e) => {
    dispatchReducer({ type: "setEmail", payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    dispatchReducer({ type: "setPassword", payload: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1.1/users/login`,
        {
          email: state.email,
          password: state.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        toast.custom((t) => (
          <div className="border-2 border-black bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-black font-chakra p-3 rounded-md">
            <strong>Success: </strong> {response.data.message}
          </div>
        ));
        dispatch(login());
        console.log(isAuth);
        navigate("/myProfile");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 via-red-500 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> {error.response.data.message}
        </div>
      ));
    }
  };

  return (
    <>
    {console.log("I am called")}
      <div className="bg-[#121636] shadow-xl shadow-black rounded-b-xl">
        <Header />
        <form
          className="justify-center flex flex-col gap-3 py-5 items-center"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Your Email"
            value={state.email}
            onChange={handleEmailChange}
            className="p-3 border-2 rounded-md border-blue-400"
          />
          <input
            type="password"
            placeholder="Your Password"
            value={state.password}
            onChange={handlePasswordChange}
            className="p-3 border-2 rounded-md border-blue-400"
          />
          <div className="flex flex-row gap-4 justify-between">
            <button className="text-blue-400 bg-white hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2">
              Login
            </button>
            <Link
              to="/register"
              className="text-blue-400 rounded-lg px-5 py-2 bg-white hover:bg-blue-400 hover:text-white"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
