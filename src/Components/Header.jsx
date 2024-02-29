import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../features/cart/authSlice";
import logo from "../assests/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImProfile } from "react-icons/im";

export default function Header() {
  const { isAuth,token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  console.log(token);
  useEffect(() => {
    if (isAuth) {
      axios
        .get("https://chat-ioserver.onrender.com/api/v1.1/users/myProfile", {
          headers: {
            "Content-Type": "application/json",
            "Authorization" :`Bearer ${token}`,
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
        `https://chat-ioserver.onrender.com/api/v1.1/users/logout`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization" :`Bearer ${token}`,
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
    <div className="min-w-[100%] fixed top-0 left-0 z-20">
      <div className="flex gap-8 justify-around py-6 bg-black shadow-lg rounded-b-3xl shadow-blue-800">
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
              <h1 className="text-pink-500 text-xl font-semibold  font-chakra p-3">
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
                className="flex items-center justify-around gap-[1rem] font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300 "
              >
                My Profile
                <ImProfile size={34} />
              </Link>
            </>
          ) : (
            <Link
              to="/register"
              className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300"
            >
              Register
            </Link>
          )}
          {isAuth ? (
            <>
              <span
                className="flex items-center justify-around gap-[1rem] font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300 "
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl"
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
          <div className="md:hidden z-20 shadow-2xl shadow-pink-500 top-[100px] left-0 absolute w-full p-5 flex flex-col gap-4 bg-black">
            {image && (
              <div className="flex flex-row gap-[3rem]">
                <img
                  className="w-20 h-20 rounded-full border-4 shadow-full shadow-pink-800"
                  src={image}
                  alt="profileImage"
                />
                <h1 className="text-blue-600  text-3xl font-chakra p-3">
                  Welcome!! {userName.toString().toUpperCase()}
                </h1>
              </div>
            )}

            {isAuth ? (
              <Link
                to="/myProfile"
                className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
            ) : (
              <Link
                to="/register"
                className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            )}
            {isAuth ? (
              <span
                className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300"
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
                className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-lg text-blue-500 font-chakra hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300"
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
