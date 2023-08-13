import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="flex justify-between p-6">
        <h1 className="text-blue-500 text-4xl font-chakra text-center ">
          RohanChat.io
          <p className="text-sm text-start">Let's Chat</p>
        </h1>   
        <div className="flex gap-4">
          <Link
            to="/register"
            className="text-blue-800 bg-white font-chakra rounded-lg px-4 py-3  flex justify-center items-center hover:bg-blue-500 hover:text-white"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-blue-500 bg-white font-chakra rounded-lg px-4 py-3  flex justify-center items-center hover:bg-blue-500 hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
