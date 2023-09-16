import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LeaveRoomAndSendMessage({ socket }) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const { room: roomno, id } = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
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

        console.log("user data", response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log("----------roomno useEffect called------------");
    setRoom(roomno);
    if (roomno !== "") {
      socket.emit("join_room", roomno);
    }
  }, [roomno]);

  const leaveRoom = () => {
    if (room !== "") {
      socket.emit("leave_room", room);
      alert(`Room no. ${room} Left`);
      setMessage("");
      setMessageReceived([]);
      navigate('/join');
    }
  };

  const sendMessage = () => {
    if (message !== "" && room !== "") {
      socket.emit("send_message", { message, room, sender: user.name });
      setMessage("");
    }
  };

  useEffect(() => {
    console.log("---------setMessageReceived useEffect called-----------");
    socket.on("r-m", (data) => {
      console.log("msg from server", data);
      setMessageReceived((prevState) => [...prevState, { ...data }]);
    });
  }, [socket]);

  useEffect(() => {
    console.log("msg received", messageReceived);
  }, [messageReceived]);

  useEffect(() => {
    console.log("-----------setMessageList useEffect called--------------");
    const getUserData = async (senderName) => {
      if (senderName !== user.name) {
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
      }
    };

    const fetchUserDataForMessages = async () => {
      const userDataSet = new Set();

      for (const obj of messageReceived) {
        if (obj.senderName !== user.name) {
          const userData = await getUserData(obj.senderName);
          console.log();
          if (userData) {
            userDataSet.add(userData._id);
          }
        }
      }
      console.log(userDataSet);
      for (const obj of messageReceived) {
        if(userDataSet == null){
          console.log("No recivers are there");
        }
        if (obj.message) {
          const addUsertoDb = async (message) => {
            try {
              const response = await axios.post(
                `http://localhost:3001/api/v1.1/chat/chat/${id}/${roomno}`,
                {
                  content: message,
                  receivers: Array.from(userDataSet),
                  
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              );
              console.log(message  +  Array.from(userDataSet))
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
          addUsertoDb(obj.message);
        }
      }
    };

    fetchUserDataForMessages();
  }, [messageReceived, roomno, id, user]);
  const isAuth = JSON.parse(localStorage.getItem("auth")) || false;
  console.log("isAuth", isAuth);

  return (
    <div className="bg-[#121636] min-h-screen">
      <Header />
      <div className="pt-10 px-4">
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
              className="text-blue-300 bg-blue-500 rounded-xl m-3 p-3 text-4xl font-chakra shadow-xl shadow-[#121636]"
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
  );
}

export default LeaveRoomAndSendMessage;
