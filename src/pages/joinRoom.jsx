import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../index.css";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

// const socket = io.connect("http://localhost:3001");

function JoinRoom({ socket }) {
  console.log("socket hai", socket);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [room, setRoom] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  console.log(isAuth);
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "https://chat-app-server-xas6.onrender.com/api/v1.1/users/myProfile",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("user data", response.data.user);
      setUserProfile(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const joinRoom = async (e) => {
    e.preventDefault();
    if (isAuth && room !== "" && userProfile) {
      try {
        const response = await axios.post(
          "https://chat-app-server-xas6.onrender.com/api/v1.1/chat/join",
          {
            roomno: room,
          },
          {
            withCredentials: true,
          }
        );

        console.log("response aya", response);

        if (response && response.data) {
          toast.custom((t) => (
            <div className="border-2 border-black bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-black font-chakra p-3 rounded-md">
              <strong>Success: </strong> {response.data.message}
            </div>
          ));
        }

        socket.emit("join_room", room);
        navigate(`/chat/${userProfile._id}/${room}`);
      } catch (error) {
        toast.custom((t) => (
          <div className="border-2 border-white bg-gradient-to-tr from-red-400 via-red-500 to-red-700 text-white font-chakra p-3 rounded-md">
            <strong>Error:</strong> {error.response.data.message}
          </div>
        ));
        console.error("Error joining room:", error);
      }
    } else {
      console.log(
        "User is not authenticated. Redirect to login or show a message."
      );
    }
  };

  return (
    <div className="bg-[#121636]">
      <Header />
      <div className="pt-[10px] px-4">
        <div className="flex justify-center items-center p-7 drop-shadow-2xl drop-shadow-green-400">
          <form onSubmit={joinRoom}>
            <input
              type="text"
              placeholder="Enter Room No.."
              onChange={(e) => setRoom(e.target.value)}
              value={room}
              className="text-blue-700 p-3 rounded-l-lg focus:bg-blue-300 font-chakra"
            />
            <button className="bg-[#1d54c9] text-white rounded-r-xl p-3 font-chakra">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom;
