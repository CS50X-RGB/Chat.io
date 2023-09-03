import Header from "../Components/Header";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuth = useSelector((store) => store.auth.isAuth);
  console.log(isAuth);
  return (
    <div>
      <Header />
      <h1 className="text-white text-center">
        {isAuth} is value of the auth now
      </h1>
      {isAuth ? <p>Hi Rohan</p> : <p>Null hai bhai</p>}
    </div>
  );
}
