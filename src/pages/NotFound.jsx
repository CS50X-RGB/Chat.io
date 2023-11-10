import Footer from "../Components/Footer";
import Header from "../Components/Header";
import pic1 from "../assests/404.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="bg-[#121636]">
        <Header />
        <div className="flex flex-col justify-center shadow-xl shadow-black md:flex-row">
          <img src={pic1} className="w-1/4 h-3/4 justify-center items-center flex" alt="img" />
          <div className="flex flex-col justify-center gap-2 text-center text-white">
            <h1 className="text-5xl font-ostwald">404</h1>
            <h3 className="font-chakra text-sm">Something is missing</h3>
            <h4 className="text-sm font-chakra">This page is missing or you assembled the link incorrectly</h4>
            <Link to='/' className="px-4 py-2 rounded-full bg-slate-100 text-blue-600 hover:text-white hover:bg-blue-500">Go to Home Page</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
