import React, { useState } from "react";
import io from "socket.io-client";
import "../index.css";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const socket = io.connect("http://localhost:3001");

function JoinRoom() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (isAuth) {
      if (room !== "") {
        socket.emit("join_room", room);
        navigate(`/chat/${room}`);
      }
    } else {
      // Handle case when user is not authenticated
      // You can redirect to login or show a message
      console.log("User is not authenticated. Redirect to login or show a message.");
    }
  };

  return (
    <div className="bg-[#121636]">
      <Header />
      <div className="pt-[10px] px-4">
        <div className="flex justify-center items-center p-7 drop-shadow-2xl drop-shadow-green-400">
          <input
            type="text"
            placeholder="Enter Room No.."
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            className="text-blue-700 p-3 rounded-l-lg focus:bg-blue-300 font-chakra"
          />
          <button
            onClick={joinRoom}
            className="bg-[#1d54c9] text-white rounded-r-xl p-3 font-chakra"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom;
