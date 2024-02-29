import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/cart/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Footer from "../Components/Footer";

function reducer(state, action) {
  console.log("Action", action);
  console.log("Current state", state);
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
        `https://chat-ioserver.onrender.com/api/v1.1/users/login`,
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
        if (response.data.success) {
          dispatch(login({ token: response.data.token }));
          navigate("/");
        }
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
      <div className="bg-[#121636] pt-[10rem] p-[1rem] md:p-[3rem] shadow-xl shadow-black rounded-b-xl">
        <div className="flex p-2 md:p-7 flex-row gap-8 justify-center">
          <div className="hidden p-10  rounded-l-xl text-white md:flex items-center justify-center bg-gradient-to-tr from-blue-500 via-teal-400 to-black">
            <h1 className="flex flex-col font-ostwald text-4xl justify-center">
              Hi lets login and re-start your chatting journey
              <p className="flex justify-center">Your chatting solution</p>
            </h1>
          </div>
          <form
            className="justify-center bg-black w-[50vh] flex flex-col gap-6 p-[1rem] items-center shadow-xl text-2xl rounded-r-xl shadow-blue-400 md:p-4 rounded-2xl"
            onSubmit={handleLogin}
          >
            <h1 className="text-blue-500 font-ostwald font-bold text-5xl tracking-wider py-[1rem]">
              LOGIN
            </h1>
            <input
              type="email"
              placeholder="Your Email"
              value={state.email}
              onChange={handleEmailChange}
              className="p-3 border-2 rounded-2xl text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-black focus:bg-blue-600 w-full"
            />
            <input
              type="password"
              placeholder="Your Password"
              value={state.password}
              onChange={handlePasswordChange}
              className="p-3 border-2 rounded-2xl text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-black focus:bg-blue-600 w-full"
            />
            <div className="flex  flex-col text-xl w-[60%] gap-2 justify-center">
              <button className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-2xl text-blue-500 font-ostwald hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300">
                Login
              </button>
              <p className="text-white font-chakra justify-center flex">OR</p>
              <Link
                to="/register"
                className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-2xl text-blue-500 font-ostwald hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300"
              >
                Register
              </Link>
            </div>
            <Link
              to="/forgotPassword"
              className="flex items-end justify-end font-bold bg-black px-6 py-3 rounded-2xl text-blue-500 font-ostwald hover:bg-blue-500 hover:text-black text-xl"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
