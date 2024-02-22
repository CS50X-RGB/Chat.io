import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { resetIdentifier } = useParams("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const [response, setResponse] = useState("");
  async function submitDetails(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/user/resetpassword/${resetIdentifier}`,
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
      console.log(response);
      setResponse(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-row justify-center gap-7">
        <div className="hidden p-10  rounded-l-xl text-white md:flex items-center justify-center bg-gradient-to-tr from-blue-500 via-teal-400 to-black">
          <h1 className="flex flex-col font-ostwald text-4xl justify-center">
            Hi lets login and re-start your chatting journey
            <p className="flex justify-center">Your chatting solution</p>
          </h1>
        </div>
        <form
          onSubmit={submitDetails}
          className="bg-black text-blue-800 font-ostwald rounded-r-2xl border border-blue-600 shadow-2xl shadow-blue-500/40"
        >
          <input
            type="password"
            value={password}
            placeholder="Enter your new password"
            className="rounded-2xl text-3xl text-black bg-blue-600 border border-blue-600"
            onChange={(e) => setPassword(e.target.value)}
          />
          {response && <h1 className="text-red-600">{response}</h1>}
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl border border-blue-500 text-blue-500"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}
