import React, { useState } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        toast.custom((t) => (
          <div className="border-2 border-black bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700 text-black font-chakra p-3 rounded-md">
            <strong>Success: </strong> {response.data.message}
          </div>
        ));
      }
    } catch (error) { 
      toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> {error.response.data.message}
        </div>
      ));
    }
  };

  return (
    <>
      <div className="bg-[#121636] shadow-xl shadow-black rounded-b-xl">
        <Header />        
        <form
          className="justify-center flex flex-col gap-3 py-5 items-center"
          onSubmit={handleRegister}
        >
          {
            (name !== "") ? <h1 className="text-center font-chakra text-4xl text-white">Hi {name}</h1> : ""
          }
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your Name"
            className="p-3 border-2 rounded-md text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-white focus:bg-blue-600"
          />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your Email"
            className="p-3 border-2 rounded-md text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-white focus:bg-blue-600"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Your Password"
            className="p-3 border-2 rounded-md text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-white focus:bg-blue-600"
          />
          <div className="flex flex-row gap-4 justify-between">
            <button
              type="submit"
              className="text-blue-400 bg-white hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2"
            >
              Register
            </button>
            <Link
              to="/login"
              className="text-blue-400 rounded-lg px-5 py-2 bg-white hover:bg-blue-400 hover:text-white"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
