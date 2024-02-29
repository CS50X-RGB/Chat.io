import axios from "axios";
import { useState } from "react";
import Footer from "../Components/Footer";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://chat-ioserver.onrender.com/api/v1.1/users/forgotPassword",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row p-[3rem] gap-8 h-[80vh] justify-center items-center bg-black ">
        <div className="hidden p-10  rounded-l-xl text-white md:flex items-center justify-center bg-gradient-to-tr from-blue-500 via-teal-400 to-black">
          <h1 className="flex flex-col font-ostwald text-4xl justify-center">
            Put Your Email id then go to your email to get further instructions
          </h1>
        </div>
        <form
          onSubmit={formSubmit}
          className="flex flex-col justify-center items-center gap-4 px-[1rem] md:px-[3rem] py-[1rem] w-[70%] md:w-1/2 box2 rounded-r-[2rem] bg-back relative z-20"
        >
          <h1 className="text-blue-600 text-center font-bold font-ostwald text-5xl">Recover Password</h1>
          <input
            type="email"
            name="email"
            value={email}
            required
            className="p-3 border-2 rounded-2xl text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-black focus:bg-blue-600 w-full"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <button type="submit" className="bg-blue-500 font-ostwald flex flex-row justify-center items-center text-black px-[2rem] md:px-[4rem] py-[0.5rem] md:py-[1rem] rounded-3xl shadow-text shadow-2xl hover:text-text hover:bg-black">
            Recover Password
          </button>
        </form>
        <h1 className= "text-center text-xl md:text-3xl text-green-600 font-ostwald">{response.message}</h1>
      </div>
      <Footer />
    </>
  );
}
