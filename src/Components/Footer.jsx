import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-col space-y-7 font-chakra bg-black text-white items-center justify-center flex-end h-[40%]">
      <div className="flex flex-col justify-center p-5">
        <div className="flex flex-col text-center text-2xl">
          <h1>I love Open sourcing if you found any bug lets fix it together</h1>
          <Link to="https://github.com/CS50X-RGB/Chat.io" className="text-pink-300 hover:text-blue-500">
            This Chat.io Frontend
          </Link>
          <Link to="https://github.com/CS50X-RGB/Chat.ioServer" className="text-pink-300 hover:text-blue-500">
            This Chat.io Backend
          </Link>
        </div>
        <h1 className="flex justify-center">Made with love by Rohan Chatterjee ;)</h1>
      </div>
    </div>
  );
}
