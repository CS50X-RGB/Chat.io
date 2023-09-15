import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import axios from "axios";
import sideBar from "../assests/sideBar.svg";
import { Link } from "react-router-dom";
import user1 from "../assests/userPanel.svg";

export default function SideBar() {
  const [user, setUser] = useState(null);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      axios
        .get("http://localhost:3001/api/v1.1/users/myProfile", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [isAuth]);

  return (
    <div className="bg-[#121636] w-1/12 h-screen p-2 rounded-2xl mx-3 justify-center gap-4 flex flex-col shadow-xl shadow-pink-500">
      <div className="text-blue-400 text-center flex flex-col justify-between">
        {isAuth && user ? (
          <h1 className="text-xl font-chakra mb-4">Hi! {user.name}</h1>
        ) : null}
          <Link
            to={"/join"}
            className="flex flex-col items-center cursor-pointer mb-4"
          >
            <img
              src={sideBar}
              alt="icon1"
              className="fill-blue-500 h-10 w-10"
            />
            <p className="text-sm">Join Chat</p>
          </Link>
          <Link
            to={"/myProfile"}
            className="flex flex-col items-center cursor-pointer"
          >
            <img src={user1} alt="icon2" className="h-10 w-10" />
            <p className="text-sm">My Profile</p>
          </Link>
      </div>
    </div>
  );
}
