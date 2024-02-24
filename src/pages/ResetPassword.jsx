import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const { resetIdentifier } = useParams("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const [response, setResponse] = useState("");
  async function submitDetails(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1.1/users/resetpassword/${resetIdentifier}`,
        {
          newpass: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setResponse(response.data.message);
      navigate("/login");
      toast.custom((t) => (
        <div className="border-2 border-black bg-gradient-to-tr from-green-400 to-green-700 text-black font-chakra p-3 rounded-md">
          <strong>Sucess:</strong> {response.data.message}
        </div>
      ));
    } catch (error) {
      toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> {error.response.data.message}
        </div>
      ));
      // error.response.data.message
    }
  }
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-7 h-[80vh] bg-black">
        <div className="hidden p-10  rounded-l-xl text-white md:flex items-center justify-center bg-gradient-to-tr from-pink-500 via-blue-400 to-black">
          <h1 className="flex flex-col font-ostwald text-4xl justify-center">
            Put Your Updated Password here 
          </h1>
        </div>
        <form
          onSubmit={submitDetails}
          className="bg-black px-[2rem] py-[4rem] rounded-xl flex flex-col gap-5 text-blue-800 font-ostwald rounded-r-2xl border border-blue-600 shadow-2xl shadow-blue-500/40"
        >
        <h1 className="text-3xl md:text-5xl text-center">Recover Password</h1>
          <input
            type="password"
            value={password}
            placeholder="Enter your new password"
            className="p-3 border-2 rounded-2xl text-blue-400 font-bold font-chakra focus:text-white border-blue-400 bg-black focus:bg-blue-600 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          {response && <h1 className="text-red-600">{response}</h1>}
          <button
            type="submit"
            className="bg-blue-500 font-ostwald flex flex-row justify-center items-center text-black px-[2rem] md:px-[4rem] py-[0.5rem] md:py-[1rem] rounded-3xl shadow-text shadow-2xl hover:text-text hover:bg-black"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}
