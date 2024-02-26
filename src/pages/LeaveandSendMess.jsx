import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function LeaveRoomAndSendMessage({ socket }) {
  const { state } = useLocation();
  const { selectedColor } = state || { selectedColor: "black" };
  const { token } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const { room: roomno, id } = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `https://chat-ioserver.onrender.com/api/v1.1/chat/chat/${roomno}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      for (let i = 0; i < response.data.content.length; i++) {
        console.log(response.data.content[i]);
      }
      const filteredMessages = response.data.content.filter(
        (msg) => !(msg.senderName === user.name && msg.message === message)
      );

      setMessageReceived(filteredMessages);
    } catch (error) {
      console.log(error);
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
    setButtonClicked(true);
    if (message !== "" && room !== "") {
      console.log(`Message is sent by ${user.name} && message is ${message}`);
      socket.emit("send_message", {
        message,
        room,
        sender: user.name,
        _id: user.id,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://chat-ioserver.onrender.com/api/v1.1/users/myProfile",
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
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
  }, [token]);

  useEffect(() => {
    setRoom(roomno);
    if (roomno !== "") {
      socket.emit("join_room", roomno);
      getMessages();
    }
    return () => {
      socket.off("r-m");
    };
  }, [roomno, socket]);

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      console.log(data);
      console.log("I am updating messageReceivedArray before", messageReceived);
      console.log({
        senderName: data.senderName,
        message: data.message,
        _id: user._id,
      });
      setMessageReceived((prevMessages) => [
        ...prevMessages,
        {
          senderName: data.senderName,
          message: data.message,
          _id: user._id,
        },
      ]);
    };
    socket.on("r-m", handleReceivedMessage);
    console.log("I am updating messageReceivedArray after", messageReceived);
    return () => {
      socket.off("r-m", handleReceivedMessage);
    };
  }, [socket, messageReceived, user._id]);

  useEffect(() => {
    if (buttonClicked) {
      console.log(buttonClicked);
      const fetchUserDataForMessages = async () => {
        console.log("Data sent");
        console.log(messageReceived[messageReceived.length - 1]);
        const newArray = messageReceived.filter(
          (msg) => msg.senderName !== user.name
        );
        const userDataSet = new Set(newArray.map((msg) => msg._id));
        if (userDataSet.size === 0) {
          console.log("No receivers are there");
        }
        try {
          if (messageReceived.length > 0) {
            console.log(messageReceived[messageReceived.length - 1]);
            const lastMessage = messageReceived[messageReceived.length - 1];
            console.log(Date.now());
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
                  "Authorization": `Bearer ${token}`,
                },
                withCredentials: true,
              }
            );
            console.log(response);
            console.log(Date.now());
            if (response && response.data) {
              toast.custom((t) => (
                <div className="border-2 border-black bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-black font-chakra p-3 rounded-md">
                  <strong>Success: </strong> {response.data.message}
                </div>
              ));
            }
            setButtonClicked(false);
            console.log(`HERE ${buttonClicked}`);
          }
        } catch (error) {
          console.error("Error adding user to the database:", error);
        }
      };
      console.log(`HERE ${buttonClicked}`);
      fetchUserDataForMessages();
    }
  }, [messageReceived,token]);

  const isAuth = JSON.parse(localStorage.getItem("auth")) || false;

  const getMessageColor = (a, b) => {
    switch (selectedColor) {
      case "red":
        if (a === b) {
          return "#ff69b4";
        }
        return "#15EAE3";
      case "pink":
        if (a === b) {
          return "#10ef2a";
        }
        return "#9700ff";
      case "cyan":
        if (a === b) {
          return "#DF2024";
        }
        return "#0FF0D3";
      case "black":
        if (a === b) {
          return "#F6F906";
        }
        return "#42E863";
      default:
        if (a === b) {
          return "blue";
        }
        return "#121636";
    }
  };

  const setTheme = () => {
    switch (selectedColor) {
      case "black":
        return "bg-black text-blue-500 border-r-2 border-blue-500";
      case "cyan":
        return "bg-cyan-500 text-pink-500";
      case "red":
        return "bg-red-800 text-orange-400";
      case "pink":
        return "bg-pink-500 text-blue-500";
      default:
        return "bg-[#121636]";
    }
  };

  return (
    <>
      <div className={`min-h-screen ${setTheme()}`}>
        <div className="pt-[10rem] px-4">
          <div className="fixed p-3 flex flex-row justify-between">
            <input
              type="text"
              placeholder="Enter Room No.."
              value={room}
              readOnly
              className="text-blue-700 flex flex-row justify-center items-center p-3 rounded-l-lg focus:bg-blue-300 font-chakra"
            />
            <button
              onClick={leaveRoom}
              className={`${setTheme()}  rounded-xl py-3 px-2 font-chakra`}
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
                className={`text-blue-300 shadow-xl w-[40vh] bg-blue-500 rounded-xl m-3 p-3 text-4xl font-chakra ${
                  selectedColor === "red"
                    ? "shadow-pink-500"
                    : selectedColor === "black"
                    ? "shadow-green-500"
                    : selectedColor === "cyan"
                    ? " shadow-cyan-500"
                    : "shadow-black"
                }`}
                style={{
                  alignSelf:
                    obj.senderName === user.name ? "flex-end" : "flex-start",
                  background: getMessageColor(obj.senderName, user.name),
                  color: "white",
                }}
              >
                <h1
                  className={`${
                    selectedColor === "red"
                      ? "text-white"
                      : selectedColor === "black"
                      ? "text-green-800"
                      : selectedColor === "cyan"
                      ? "text-black"
                      : "text-pink-500"
                  }  text-3xl font-extrabold`}
                >
                  {obj.senderName}
                </h1>
                <p
                  className={`${
                    selectedColor === "red"
                      ? "text-white"
                      : selectedColor === "black"
                      ? "text-black"
                      : selectedColor === "cyan"
                      ? "text-black"
                      : "text-pink-500"
                  }
                  font-bold
                  text-3xl `}
                >
                  {obj.message}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-2 flex flex-row p-4 max-w-full">
          <input
            type="text"
            placeholder="Enter Message.."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="py-3 w-9/12 border-2 border-blue-300 text-blue-600 px-3 focus:bg-blue-300 rounded-l-xl font-chakra text-xl font-bold"
          />
          {isAuth && (
            <button
              onClick={() => sendMessage()}
              className={`${setTheme()}   rounded-r-xl px-3 font-chakra`}
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
