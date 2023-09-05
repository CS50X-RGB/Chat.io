import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import Header from "../Components/Header";
import axios from "axios";


function LeaveRoomAndSendMessage({ socket }) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { room: roomParam } = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
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
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log("----------roomParam useeffect called------------");
    setRoom(roomParam);
    if (roomParam !== "") {
      socket.emit("join_room", roomParam);
    }
  }, [roomParam.socket]);

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
      socket.emit("send_message", { message, room, sender: user.name });
      setMessage("");
    }
  };

  useEffect(() => {
    console.log("---------setMessageReceived useeffect callleddd-----------");
  
    const handleReceivedMessage = (data) => {
      console.log("msg from server", data);
      setMessageReceived((prevState) => [...prevState, { ...data }]);
    };
  
    socket.on("r-m", handleReceivedMessage);
  
    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("r-m", handleReceivedMessage);
    };
  }, [socket]);  

  useEffect(() => {
    console.log("msg received", messageReceived);
  }, [messageReceived]);

  useEffect(() => {
    console.log("-----------setMessageList useeffect callleddd--------------");
    setMessageList(
      messageReceived.map((obj, index) => (
        <div
          key={index}
          className="text-blue-300 bg-blue-500 rounded-xl m-3 p-3 text-4xl font-chakra"
          style={{
            alignSelf: obj.senderName === user.name ? "flex-end" : "flex-start",
            background: obj.senderName === user.name ? "#b9fcae" : "#a21212",
            color: "black",
          }}
        >
          <h1 className="text-pink-500 text-3xl font-bold">{obj.senderName}</h1>
          {obj.message}
        </div>
      ))
    );
  }, [messageReceived,user.name]);

  const isAuth = JSON.parse(localStorage.getItem("auth")) || false;
  console.log("isauth", isAuth);
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
        <div
          className="scroll-m-4 p-4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {messageList}
        </div>
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
