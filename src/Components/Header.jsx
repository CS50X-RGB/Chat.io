import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../features/cart/authSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isAuth) {
      axios
        .get("https://chat-app-server-xas6.onrender.com/api/v1.1/users/myProfile", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setUserName(response.data.user.name);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [isAuth]);

  const handleLogout = async () => {
    try {
      await axios.get(
        `https://chat-app-server-xas6.onrender.com/api/v1.1/users/logout`,
        {
          headers: {
            "Content-Type": "application/json",
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
      navigate("/login");
    } catch (err) {
      toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 via-red-500 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> Problem in Logging out
        </div>
      ));
    }
  };

  return (
    <div className="flex justify-between p-6 bg-blue-800 ">
      <h1 className="text-blue-500 text-4xl font-chakra text-center">
        RohanChat.io
        <p className="text-sm text-start">Let's Chat</p>
      </h1>
      <div className="flex gap-4">
        {isAuth ? (
          <>
            <h1 className="text-white font-chakra p-3">
              Weclome!! {userName.toString().toUpperCase()}
            </h1>
            <Link
              to="/myProfile"
              className="text-blue-500 bg-white font-chakra rounded-lg px-4 py-3 flex justify-center items-center hover:bg-blue-500 hover:text-white"
            >
              My Profile
            </Link>
          </>
        ) : (
          <Link
            to="/register"
            className="text-blue-500 bg-white font-chakra rounded-lg px-4 py-3 flex justify-center items-center hover:bg-blue-500 hover:text-white"
          >
            Register
          </Link>
        )}
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
