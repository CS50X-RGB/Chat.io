import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col space-y-7 font-chakra bg-black text-white items-center justify-center flex-end">
        <div className="flex bg-blue-800/60 p-5 my-5 rounded-2xl  flex-row justify-center gap-4">
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl flex flex-col  justify-start text-left">
              If you want to contact me
            </h1>
            <p className="text-lg">You can mail me here click on the button</p>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <a
              href="mailto:rohanchatterjee866@gmail.com"
              className="bg-blue-500 p-3 rounded-xl"
            >
              Send an Email
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center p-5">
          <div className="flex flex-col text-center text-2xl">
            <h1>
              I love Open sourcing if you found any bug lets fix it together
            </h1>
            <div class="flex justify-center items-center gap-6 flex-row">
              <Link
                to="https://github.com/CS50X-RGB/Chat.io"
                className="text-pink-300 hover:text-blue-500"
              >
                This Chat.io Frontend
              </Link>
              <Link
                to="https://github.com/CS50X-RGB/Chat.ioServer"
                className="text-pink-300 hover:text-blue-500"
              >
                This Chat.io Backend
              </Link>
            </div>
          </div>
          <h1 className="flex justify-center">
            Made with love by Rohan Chatterjee ;)
          </h1>
        </div>
      </div>
    </>
  );
}
