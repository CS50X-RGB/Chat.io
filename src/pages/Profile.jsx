import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [recivers, setRecivers] = useState([]);
  const [chatters, setChatters] = useState([]);
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
            const updatedRecivers = new Set();
            const chatter = new Set();
            chatResponse.data.message.forEach((message) => {
              updatedRecivers.add(message.room);

              message.content.forEach((content) => {
                if (content.senderName !== response.data.user.name) {
                  chatter.add(content.senderName);
                }
                chatter.add("YOU");
              });
            });
            console.log(chatter);
            setChatters(Array.from(chatter));
            setRecivers(Array.from(updatedRecivers));
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [isAuth]);

  return (
    <>
      <Header />
      <div className="bg-[#121636] pt-[5rem]">
        <div className="flex justify-around flex-row gap-3">
          {isAuth && <SideBar />}
          <div className="flex justify-around m-[2rem] flex-row flex-1 text-white rounded-2xl shadow-2xl shadow-pink-300 bg-cyan-400/30 my-[6rem] text-center w-1/2 max-h-[25%]">
            <div className="flex p-[2rem] flex-col justify-center items-center">
              {isAuth && user ? (
                <>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.profileImage}
                      className="m-7 border-2 rounded-3xl border-pink-300"
                    />
                  ) : (
                    <h1>No Profile Image</h1>
                  )}

                  <h1 className="text-5xl font-ostwald">Hi {user.name}!</h1>
                  <h1 className="font-ostwald">How're you doin'?</h1>
                  {user.createdAt && (
                    <h1>
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </h1>
                  )}
                  <div className="flex p-6 flex-col justify-center items-center">
                    <h1 className="text-3xl font-ostwald">
                      No. of rooms joined are : {recivers.length}
                    </h1>
                  </div>
                </>
              ) : (
                <p>Welcome</p>
              )}
            </div>
            <div className="flex flex-end bg-gradient-to-r from-blue-300 via-cyan-500 to-pink-500 shadow-top-left shadow-2xl bg-blend-darken mix-blend-normal brightness-110 blur w-[10rem] rounded-r-full"></div>
          </div>
          <div className="flex justify-around flex-row flex-1 text-white rounded-2xl shadow-2xl shadow-pink-300 bg-cyan-400/30 my-[6rem] text-center w-1/2 max-h-[25%]">
            <div className="flex p-[2rem] font-ostwald flex-col justify-center items-center">
              <h1 className="text-5xl">History</h1>
              <h3 className="text-3xl flex">See Your Joined Room: </h3>
              <div className="grid grid-cols-2 gap-4">
                {recivers.map((room, id) => (
                  <Link
                    key={id}
                    to={`/chat/${user._id}/${room}`}
                    className="bg-cyan-500 flex flex-col px-12 py-3 my-3 rounded-full shadow-2xl shadow-pink-700/60"
                  >
                    Room id : {room}
                    <h1 className="text-sm font-ostwald">
                      Chatters in the room :
                    </h1>
                    <div className="overflow-y ring-2 ring-pink-300 rounded-xl p-2">
                      {chatters.map((talker, talkerId) => (
                        <h1 key={talkerId}>{talker}</h1>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-end bg-gradient-to-r from-blue-300 via-cyan-500 to-pink-500 shadow-top-left shadow-2xl bg-blend-darken mix-blend-normal brightness-110 blur w-[10rem] rounded-r-full"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
