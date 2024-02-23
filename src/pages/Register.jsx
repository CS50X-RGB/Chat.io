import React, { useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/cart/authSlice";
import { IoMdAdd } from "react-icons/io";

export default function Register() {
  const dispatch = useDispatch();
  const { isAuth,token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  console.log(token);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1.1/users/register`,
        {
          name,
          email,
          password,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response && response.data) {
        toast.custom((t) => (
          <div className="border-2 border-black bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700 text-black font-chakra p-3 rounded-md">
            <strong>Success: </strong> {response.data.message}
          </div>
        ));
      }
      if(response.data.success){
        console.log(response.data.success);
        console.log(response.data.token);
        dispatch(login({ token: response.data.token }));
        console.log(isAuth);
        navigate("/");
      }    
    } catch (error) {
      const errorMessages = error.response.data.errors.map((error) => error.message).join(', ');
        toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> {errorMessages}
        </div>
      ));
    }
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#121636] h-screen flex flex-col items-center justify-center shadow-xl shadow-black rounded-b-xl">
        <div className="flex p-4 flex-col md:flex-row gap-8 justify-center rounded-xl">
          <div className="hidden md:flex text-white text-center rounded-l-2xl p-5 flex-row md:flex-col justify-center items-center bg-gradient-to-bl from-blue-300 via-pink-400 to-blue-500 h-[90vh]">
            {name !== "" ? (
              <h1 className="text-center font-ostwald text-4xl text-white font-extrabold pt-[3rem]">
                Hi {name} get the seamless Chatting experience
                <p>Create rooms and talk with your friends endlessly</p>
              </h1>
            ) : (
              <h5 className="text-2xl font-bold font-ostwald tracking-wider">
                Register here to get the seamless Chatting experience
                <p>Create rooms and talk with your friends endlessly</p>
              </h5>
            )}
          </div>
          <form
            className="justify-center bg-black flex flex-col gap-3 py-5 items-center shadow-xl shadow-blue-300 p-4 text-xl rounded-r-2xl w-[50vh]"
            onSubmit={handleRegister}
          >
            <h1 className="text-3xl font-ostwald text-blue-700 p-8 tracking-wider">
              REGISTER
            </h1>
            <div
              className={`rounded-full ${
                !image ? "p-[7rem]" : "p-[.5rem]"
              } relative border-2 border-text`}
            >
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={convertToBase64}
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="ProfileImage"
                      className="rounded-full w-[10rem] h-[10rem] object-cover"
                    />
                    <IoMdAdd
                      size={50}
                      className="fill-blue-500 z-30 absolute -right-[1rem] bottom-[0.1rem]"
                    />
                  </>
                ) : (
                  <IoMdAdd
                    size={50}
                    className="fill-blue-500 z-30 absolute -right-[.8rem] bottom-[2rem]"
                  />
                )}
              </label>
            </div>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Your Name"
              className="p-3 border-2 rounded-2xl text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-black focus:bg-blue-600 w-full"
            />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your Email"
              className="p-3 border-2 rounded-2xl text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-black focus:bg-blue-600 w-full"
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Your Password"
              className="p-3 border-2 rounded-2xl text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-black focus:bg-blue-600 w-full"
            />
            <div className="flex  flex-col text-xl w-[60%] gap-2 justify-center">
              <button className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-2xl text-blue-500 font-ostwald hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300">
                Register
              </button>
              <p className="text-white font-chakra justify-center flex">OR</p>
              <Link
                to="/login"
                className="flex items-center justify-center font-bold bg-black px-6 py-3 rounded-2xl text-blue-500 font-ostwald hover:bg-blue-500 hover:text-black text-xl border border-dotted border-pink-300"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
