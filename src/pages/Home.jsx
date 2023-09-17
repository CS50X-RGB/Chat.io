import Header from "../Components/Header";
import { useSelector } from "react-redux";
import SideBar from "../Components/Sidebar";
import Footer from '../Components/Footer';
export default function Home() {
  const isAuth = useSelector((store) => store.auth.isAuth);
  console.log(isAuth);
  return (
    <>
    <div className="flex flex-col gap-4">
      <Header />
      {isAuth ? <SideBar/> : null}
    </div>
    <Footer/>
    </>
  );
}
