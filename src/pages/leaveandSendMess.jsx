import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LeaveRoomAndSendMessage({ socket }) {
  const { state } = useLocation();
  const { selectedColor } = state || { selectedColor: "black" };

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const { room: roomno, id } = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1.1/chat/chat/${roomno}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Exclude the last message sent by the current user
      const filteredMessages = response.data.content.filter(
        (msg) => !(msg.senderName === user.name && msg.message === message)
      );

      setMessageReceived(filteredMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async (senderName) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1.1/users/getUser/${senderName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error(`Error fetching user data for ${senderName}:`, error);
      return null;
    }
  };

  const leaveRoom = () => {
    if (room !== "") {
      socket.emit("leave_room", room);
      alert(`Room no. ${room} Left`);
      setMessage("");
      setMessageReceived([]);
      navigate("/join");
    }
  };

  const sendMessage = () => {
    if (message !== "" && room !== "") {
      socket.emit("send_message", { message, room, sender: user.name });
      setMessage("");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    setRoom(roomno);
    if (roomno !== "") {
      socket.emit("join_room", roomno);

      // Fetch messages when the component mounts
      getMessages();
    }

    // Cleanup socket subscription
    return () => {
      socket.off("r-m");
    };
  }, [roomno, socket]);

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, { ...data }]);
    };

    socket.on("r-m", handleReceivedMessage);

    // Cleanup socket subscription
    return () => {
      socket.off("r-m", handleReceivedMessage);
    };
  }, [socket]);

  useEffect(() => {
    // Check if the component is mounted before executing the logic
    if (isMounted && messageReceived.length > 0) {
      const fetchUserDataForMessages = async () => {
        const userDataSet = new Set();

        for (const obj of messageReceived) {
          if (obj.senderName !== user.name) {
            const userData = await getUserData(obj.senderName);
            if (userData && userData._id) {
              userDataSet.add(userData._id);
            }
          }
        }

        if (userDataSet.size === 0) {
          console.log("No receivers are there");
        }

        try {
          const lastMessage = messageReceived[messageReceived.length - 1];

          const response = await axios.post(
            `http://localhost:3001/api/v1.1/chat/chat/${id}/${roomno}`,
            {
              content: {
                senderName: lastMessage.senderName,
                message: lastMessage.message,
              },
              receivers: Array.from(userDataSet),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if (response && response.data) {
            toast.custom((t) => (
              <div className="border-2 border-black bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-black font-chakra p-3 rounded-md">
                <strong>Success: </strong> {response.data.message}
              </div>
            ));
          }
        } catch (error) {
          console.error("Error adding user to the database:", error);
        }
      };

      fetchUserDataForMessages();
    }
  }, [messageReceived, roomno, id, user, isMounted]);

  const isAuth = JSON.parse(localStorage.getItem("auth")) || false;
  console.log(selectedColor);
  return (
    <>
      <Header />

      <div
        className={`min-h-screen ${
          selectedColor === "black"
            ? "bg-black"
            : selectedColor === "cyan"
            ? "bg-cyan-500"
            : selectedColor === "red"
            ? "bg-red-800/90"
            : "bg-[#121636]"
        }`}
      >
        <div className="pt-[10rem] px-4">
          <div className="p-3 flex flex-row justify-between">
            <input
              type="text"
              placeholder="Enter Room No.."
              value={room}
              readOnly
              className="text-blue-700 flex flex-row justify-center items-center p-3 rounded-l-lg focus:bg-blue-300 font-chakra"
            />
            <button
              onClick={leaveRoom}
              className="bg-[#1d54c9] text-white rounded-xl py-3 px-2 font-chakra"
            >
              Leave Room
            </button>
          </div>
          <div
            className="p-4"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {messageReceived.map((obj, index) => (
              <div
                key={index}
                className="text-blue-300 bg-blue-500 rounded-xl m-3 p-3 text-4xl font-chakra shadow-xl shadow-pink-500"
                style={{
                  alignSelf:
                    obj.senderName === user.name ? "flex-end" : "flex-start",
                  background:
                    obj.senderName === user.name ? "#1d54c9" : "#121636",
                  color: "white",
                }}
              >
                <h1 className="text-pink-500 text-3xl font-bold">
                  {obj.senderName}
                </h1>
                {obj.message}
              </div>
            ))}
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
    </>
  );
}

export default LeaveRoomAndSendMessage;
