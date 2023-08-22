import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const auth = localStorage.getItem("auth") === "true";
  const history = useNavigate(); 
  console.log(auth);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1.1/users/logout`,
        {
          withCredentials: true,
        }
      );
      document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.custom((t) => (
        <div className="border-2 border-black bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-black font-chakra p-3 rounded-md">
          <strong>Sucessfully Logged Out</strong>
        </div>
      ));
      localStorage.removeItem("auth");
      window.location.reload(); 
    } catch (err) {
      toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 via-red-500 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> Problem in Logging out
        </div>
      ));
    }
  };
  useEffect(()=>{
    if(auth){
      history('/');
    }
  },[auth,history])
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
        {auth ? (
          <>
          <span
            className="text-blue-500 bg-white font-chakra rounded-lg px-4 py-3 flex justify-center items-center hover:bg-blue-500 hover:text-white"
            onClick={handleLogout} // Call the function here
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
