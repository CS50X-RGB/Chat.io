import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../index.css";
import Header from "../Components/Header";

const socket = io.connect("http://localhost:3001");

function JoinRoom() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      alert("Hi joined the room no." + room);
    }
  };

  const leaveRoom = () => {
    if (room !== "") {
      socket.emit("leave_room", room);
      alert(`Room no.Left is ${room}`);
      setMessage("");
      setRoom("");
      setMessageList("");
    }
  };

  const sendMessage = () => {
    if (message !== "" && room !== "") {
      socket.emit("send_message", { message, room, sender: true });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("r-m", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  useEffect(() => {
    setMessageList(
      messageReceived.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.sender
              ? "text-blue-300 bg-blue-500 rounded-xl m-3 flex flex-col p-3 text-4xl font-chakra"
              : "text-white bg-gray-800 rounded-xl m-3 flex flex-col p-3 text-4xl font-chakra"
          }`}
        >
          {msg.message}
        </div>
      ))
    );
  }, [messageReceived]);

  return (
    <div className="bg-[#121636]">
      <Header />
      <div className="flex justify-between pt-[10px] px-4">
        <div className="p-3">
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
        <button
          onClick={leaveRoom}
          className="bg-[#1d54c9] text-white rounded-xl py-3 px-2 font-chakra"
        >
          Leave Room
        </button>
      </div>
      <div>{messageList}</div>
      <div className="flex flex-row p-4 max-w-full">
        <input
          type="text"
          placeholder="Enter Message.."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="py-3 w-9/12 border-2 border-blue-300 text-blue-600 px-3 focus:bg-blue-300 rounded-l-xl font-chakra text-xl font-bold"
        />
        <button
          onClick={sendMessage}
          className="bg-[#1d54c9] text-white rounded-r-xl px-3 font-chakra"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;
