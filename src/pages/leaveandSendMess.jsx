import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import "../index.css";
import Header from "../Components/Header";
import axios from "axios";
const socket = io.connect("http://localhost:3001");

function LeaveRoomAndSendMessage() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { room: roomParam,id : user_id } = useParams();
  useEffect(() => {
    setRoom(roomParam);
    if (roomParam !== "") {
      socket.emit("join_room", roomParam);
    }
  }, [roomParam]);

  const leaveRoom = () => {
    if (room !== "") {
      socket.emit("leave_room", room);
      alert(`Room no. ${room} Left`);
      setMessage("");
      setMessageReceived([]);
    }
  };

  const sendMessage = () => {
    if (message !== "" && room !== "") {
      socket.emit("send_message", { message, room });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("r-m", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data.message]);
    });
  }, []);

  useEffect(() => {
    setMessageList(
      messageReceived.map((msg, index) => (
        <div
          key={index}
          className="text-blue-300 bg-blue-500 rounded-xl m-3 flex flex-col p-3 text-4xl font-chakra"
        >
          {msg}
        </div>
      ))
    );
  }, [messageReceived]);

  const isAuth = JSON.parse(localStorage.getItem("auth")) || false;

  return (
    <div className="bg-[#121636] scroll-m-4 min-h-screen">
      <Header />
      <div className="pt-[10px] px-4">
        <div className="p-3 flex flex-row justify-between">
          <input
            type="text"
            placeholder="Enter Room No.."
            value={room}
            readOnly
            className="text-blue-700 flex flex-row justify-center items-center  p-3 rounded-l-lg focus:bg-blue-300 font-chakra"
          />
          <button
            onClick={leaveRoom}
            className="bg-[#1d54c9] text-white rounded-xl py-3 px-2 font-chakra"
          >
            Leave Room
          </button>
        </div>
        <div className="scroll-m-4 p-4">{messageList}</div>
      </div>
      <div className="fixed bottom-0 flex flex-row p-4 max-w-full">
        <input
          type="text"
          placeholder="Enter Message.."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="py-3 w-9/12 border-2 border-blue-300 text-blue-600 px-3 focus:bg-blue-300 rounded-l-xl font-chakra text-xl font-bold"
        />
        {isAuth && (
          <button
            onClick={sendMessage}
            className="bg-[#1d54c9] text-white rounded-r-xl px-3 font-chakra"
          >
            Send Message
          </button>
        )}
      </div>
    </div>
  );
}

export default LeaveRoomAndSendMessage;
