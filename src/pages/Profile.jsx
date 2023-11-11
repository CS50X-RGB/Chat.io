import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/Sidebar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [recivers, setRecivers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          const response = await axios.get(
            "http://localhost:3001/api/v1.1/users/myProfile",
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          setUser(response.data.user);
          if (response.data.user) {
            const chatResponse = await axios.get(
              `http://localhost:3001/api/v1.1/chat/${response.data.user._id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(chatResponse);
            const updatedRecivers = [];
            const senderNames = new Set();
            for (let i = 0; i < chatResponse.data.message.length; i++) {
              updatedRecivers.push(chatResponse.data.message[i].room);
              for (
                let j = 0;
                j < chatResponse.data.message[i].content.length;
                j++
              ) {
                const senderName =
                  chatResponse.data.message[i].content[j].senderName;
                if (senderName !== response.data.user.name) {
                  senderNames.add(senderName);
                }
              }
            }
            setRecivers(updatedRecivers);
            console.log(recivers);
            console.log(senderNames);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [isAuth, recivers]);

  return (
    <>
      <div className="bg-[#121636]">
        <div className="flex justify-around flex-row gap-3">
          {isAuth ? <SideBar /> : ""}
          <div className="flex justify-around m-[2rem] flex-row flex-1 text-white rounded-2xl shadow-2xl shadow-pink-300 bg-cyan-400/30 my-[6rem] text-center w-1/2 max-h-[25%]">
            <div className="flex p-[2rem] flex-col justify-center items-center">
              {isAuth && user ? (
                <h1 className="text-5xl font-ostwald">Hi {user.name}!</h1>
              ) : (
                <p>Welcome</p>
              )}
              <h1 className="font-ostwald">How're you doin'?</h1>
              {user && user.createdAt && (
                <h1>Joined {new Date(user.createdAt).toLocaleDateString()}</h1>
              )}
            </div>
            <div className="flex flex-end bg-gradient-to-r from-blue-300 via-cyan-500 to-pink-500 shadow-top-left shadow-2xl bg-blend-darken mix-blend-normal brightness-110 blur w-[10rem] rounded-r-full"></div>
          </div>
          <div className="flex justify-around flex-row flex-1 text-white rounded-2xl shadow-2xl shadow-pink-300 bg-cyan-400/30 my-[6rem] text-center w-1/2 max-h-[25%]">
            <div className="flex p-6 flex-col justify-center items-center">
              {isAuth && user ? (
                <h1 className="text-5xl font-ostwald">
                  No. of rooms joined are : {recivers.length}
                </h1>
              ) : (
                <p>Welcome</p>
              )}
              <h3 className="text-3xl">See Your Joined Room: </h3>
              {/* {recivers.map((room, id) => (
                <Link key={id} href={`/chat/${user._id}/${room}`} className="bg-cyan-500 p-1 my-3">
                  {room}
                </Link>
              ))} */}
            </div>
            <div className="flex flex-end bg-gradient-to-r from-blue-300 via-cyan-500 to-pink-500 shadow-top-left shadow-2xl bg-blend-darken mix-blend-normal brightness-110 blur w-[10rem] rounded-r-full"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
