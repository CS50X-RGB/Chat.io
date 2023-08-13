import { Link } from "react-router-dom";
import Header from "../Components/Header";

export function Login() {
  return (
    <>
      <div className="bg-[#121636] shadow-xl shadow-black rounded-b-xl">
        <Header />
        <form className="justify-center flex flex-col gap-3 py-5 items-center">
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 border-2 rounded-md border-blue-400"
          />
          <input
            type="text"
            placeholder="Your Password"
            className="p-3 border-2 rounded-md border-blue-400"
          />
          <div className="flex flex-row gap-4 justify-between">
            <button className="text-blue-400 bg-white hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2">
              Login
            </button>
            <Link to="/register" className="text-blue-400 rounded-lg px-5 py-2 bg-white hover:bg-blue-400 hover:text-white">Register</Link>
          </div>{" "}
        </form>
      </div>
    </>
  );
}
