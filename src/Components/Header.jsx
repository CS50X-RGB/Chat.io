import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../features/cart/authSlice";
import logo from "../assests/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuth) {
      axios
        .get("http://localhost:3001/api/v1.1/users/myProfile", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setUserName(response.data.user.name);
          setImage(response.data.user.profileImage);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [isAuth]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1.1/users/logout`,
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

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-20 shadow-lg shadow-pink-300">
      <div className="max-w-full flex justify-between p-6 bg-[#121636]">
        <Link to={"/"} className="flex flex-col">
          <h1 className="flex px-1 flex-row gap-3 text-blue-500 text-3xl md:text-4xl font-chakra text-center">
            <img src={logo} className="w-10 h-10" alt="logo" />
            RohanChat.io
          </h1>
          <p className="text-sm text-start text-blue-500">Let's Chat</p>
        </Link>
        <div className="hidden md:flex gap-4">
          {isAuth ? (
            <>
              <h1 className="text-white font-chakra p-3">
                Welcome!! {userName.toString().toUpperCase()}
              </h1>
              {image && (
                <img
                  className="w-20 h-20 rounded-full border-4 shadow-full shadow-pink-800"
                  src={image}
                  alt="profileImage"
                />
              )}
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
        <div className="md:hidden">
          <RxHamburgerMenu
            className="cursor-pointer text-pink-500"
            onClick={handleMenuToggle}
            size={40}
          />
        </div>
        {open && (
          <div className="md:hidden z-20 shadow-2xl shadow-pink-500 top-[100px] left-0 absolute w-full p-5 flex flex-col gap-4 bg-[#121636]">
            {image && (
              <div className="flex flex-row gap-[3rem]">
                <img
                  className="w-20 h-20 rounded-full border-4 shadow-full shadow-pink-800"
                  src={image}
                  alt="profileImage"
                />
                <h1 className="text-white font-chakra p-3">
                  Welcome!! {userName.toString().toUpperCase()}
                </h1>
              </div>
            )}
            {isAuth ? (
              <Link
                to="/myProfile"
                className="text-white border-t-2 border-b-2 p-3 border-pink-800 hover:text-blue-500"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-white border-t-2 border-b-2 p-3 border-pink-800 hover:text-blue-500"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            )}
            {isAuth ? (
              <span
                className="text-white border-t-2 border-b-2 p-3 border-pink-800 hover:text-blue-500"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                Logout
              </span>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-blue-500"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
