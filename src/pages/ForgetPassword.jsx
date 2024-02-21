import axios from "axios";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const formSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/forgotPassword",
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
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <form onSubmit={formSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <button type="submit">Recover Password</button>
        </form>
        <h1>{response}</h1>
      </div>
    </>
  );
}
