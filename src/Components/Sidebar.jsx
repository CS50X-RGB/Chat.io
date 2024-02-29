import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import sideBar from "../assests/sideBar.svg";
import { Link } from "react-router-dom";
import user1 from "../assests/userPanel.svg";

export default function SideBar() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { isAuth, token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth) {
      axios
        .get("https://chat-ioserver.onrender.com/api/v1.1/users/myProfile", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user);
          setProfileImage(response.data.user.profileImage);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [isAuth,token]);
  return (
    <>
      {!profileImage || !user ? (
        <></>
      ) : (
        <div className="bg-black w-1/12 h-screen p-2 rounded-2xl m-6 justify-around gap-4 hidden md:flex flex-col shadow-xl shadow-pink-500">
          {profileImage && (
            <div className="shadow-2xl shadow-pink-800 rounded-full border border-blue-400 relative">
              <img
                src={profileImage}
                className="w-full h-full object-cover rounded-full"
                alt="profilePic"
              />
            </div>
          )}
          <div className="text-blue-400 text-center flex flex-col justify-center">
            {isAuth && user ? (
              <h1 className="text-2xl font-semibold font-chakra mb-4">
                Hi! {user.name}
              </h1>
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
              <p className="text-xl font-ostwald">Join Chat</p>
            </Link>
            <Link
              to={"/myProfile"}
              className="flex flex-col items-center cursor-pointer"
            >
              <img src={user1} alt="icon2" className="h-10 w-10" />
              <p className="text-xl font-ostwald">My Profile</p>
            </Link>
          </div>
        </div>
      )}
      {!profileImage || !user ? (
        <></>
      ) : (
        <div className="flex bg-black z-10 rounded-t-3xl shadow-xl shadow-black p-[1rem] flex-row justify-around md:hidden fixed  bottom-0">
          {profileImage && (
            <img
              src={profileImage}
              className="flex flex-start w-[20%] p-1 shadow-2xl shadow-pink-800 rounded-full"
              alt="profilePic"
            />
          )}
          <div className="text-pink-700 p-1 text-center text-2xl font-semibold font-ostwald flex gap-5 flex-1 flex-row justify-center items-center">
            <Link
              to={"/join"}
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src={sideBar}
                alt="icon1"
                className="fill-blue-500 h-10 w-10"
              />
              <p className="text-xl font-ostwald">Join Chat</p>
            </Link>
            <Link
              to={"/myProfile"}
              className="flex flex-col items-center cursor-pointer"
            >
              <img src={user1} alt="icon2" className="h-10 w-10" />
              <p className="text-xl font-ostwald">My Profile</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
