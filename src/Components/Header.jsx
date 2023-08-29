import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../features/cart/authSlice"; 

export default function Header(){
  const { isAuth } = useSelector((state) => state.auth); 
  const dispatch = useDispatch(); 
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1.1/users/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      toast.custom((t) => (
        <div className="border-2 border-black bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-black font-chakra p-3 rounded-md">
          <strong>Sucessfully Logged Out</strong>
        </div>
      ));
      dispatch(logout());
      window.location.reload();
    } catch (err) {
      toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 via-red-500 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> Problem in Logging out
        </div>
      ));
    }
  };

  useEffect(() => {
    if (!isAuth) {
      history('/'); // Redirect to home page if not authenticated
    }
  }, [isAuth, history]);

  return (
    <div className="flex justify-between p-6">
      <h1 className="text-blue-500 text-4xl font-chakra text-center">
        RohanChat.io
        <p className="text-sm text-start">Let's Chat</p>
      </h1>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="text-blue-800 bg-white font-chakra rounded-lg px-4 py-3 flex justify-center items-center hover:bg-blue-500 hover:text-white"
        >
          Register
        </Link>
        {isAuth ? (
          <>
            <span
              className="text-blue-500 bg-white font-chakra rounded-lg px-4 py-3 flex justify-center items-center hover:bg-blue-500 hover:text-white"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
          </>
        ) : (
          <Link
            to="/login"
            className="text-blue-500 bg-white font-chakra rounded-lg px-4 py-3 flex justify-center items-center hover:bg-blue-500 hover:text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
