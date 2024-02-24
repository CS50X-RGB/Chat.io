import React, { useState, useEffect, useReducer } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../Components/Sidebar";

const colorReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_COLOR":
      return action.payload;
    default:
      return state;
  }
};

const intitalState = "black";

function JoinRoom({ socket }) {
  console.log("socket hai", socket);
  const { isAuth, token } = useSelector((state) => state.auth);
  const [room, setRoom] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [selectedColor, dispatch] = useReducer(colorReducer, intitalState);
  const handleColorSelection = (color) => {
    dispatch({
      type: "SELECT_COLOR",
      payload: color,
    });
  };
  const navigate = useNavigate();
  console.log(isAuth);
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1.1/users/myProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          "http://localhost:3001/api/v1.1/chat/join",
          {
            roomno: room,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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

        navigate(`/chat/${userProfile._id}/${room}`, {
          state: { selectedColor },
        });
        console.log("Color is ", selectedColor);
      } catch (error) {
        // toast.custom((t) => (
        //   <div className="border-2 border-white bg-gradient-to-tr from-red-400 via-red-500 to-red-700 text-white font-chakra p-3 rounded-md">
        //     <strong>Error:</strong> {error.response.data.message}
        //   </div>
        // ));
        // console.error("Error joining room:", error);
        if (error.response.data.erros) {
          const errorMessages = error.response.data.erros
            .map((error) => error.message)
            .join(", ");
          toast.custom((t) => (
            <div className="border-2 border-white bg-gradient-to-tr from-red-400 to-red-700 text-white font-chakra p-3 rounded-md">
              <strong>Error:</strong> {errorMessages}
            </div>
          ));
        }
      }
    } else {
      console.log(
        "User is not authenticated. Redirect to login or show a message."
      );
    }
  };
  console.log("Color is ", selectedColor);
  return (
    <>
      <div className="bg-gradient-to-tr from-blue-600 to-fuchsia-500">
        <div className="flex border-4 border-black flex-row justify-around py-[8rem] w-[100%]">
          <Sidebar />
          <div className="flex flex-col text-black flex-1 justify-center gap-2 items-center">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-ostwald">
                Set up color theme
              </h1>
              <p className="text-xl flex flex-row gap-3 p-4 font-ostwald">
                Room Background Color:{" "}
                {selectedColor === "black" ? (
                  <div className="bg-black h-10 w-10 rounded-full shadow-xl shadow-black" />
                ) : null}
                {selectedColor === "pink" ? (
                  <div className="bg-pink-400 h-10 w-10 rounded-full shadow-xl shadow-pink-400" />
                ) : null}
                {selectedColor === "blue" ? (
                  <div className="bg-blue-800 h-10 w-10 rounded-full shadow-xl shadow-blue-800" />
                ) : null}
                {selectedColor === "cyan" ? (
                  <div className="bg-cyan-500 h-10 w-10 rounded-full shadow-xl shadow-cyan-500" />
                ) : null}
                {selectedColor === "red" ? (
                  <div className="bg-red-500 h-10 w-10 rounded-full shadow-xl shadow-red-500" />
                ) : null}
              </p>
              <div className="flex cursor-pointer p-3 gap-2 justify-between">
                <div
                  onClick={() => handleColorSelection("black")}
                  className="bg-black h-10 w-10 rounded-full shadow-xl shadow-black"
                />
                <div
                  onClick={() => handleColorSelection("pink")}
                  className="bg-pink-400 h-10 w-10 rounded-full shadow-xl shadow-pink-400"
                />
                <div
                  onClick={() => handleColorSelection("blue")}
                  className="bg-blue-800 h-10 w-10 rounded-full shadow-xl shadow-blue-800"
                />
                <div
                  onClick={() => handleColorSelection("cyan")}
                  className="bg-cyan-500 h-10 w-10 rounded-full shadow-xl shadow-cyan-500"
                />
                <div
                  onClick={() => handleColorSelection("red")}
                  className="bg-red-500 h-10 w-10 rounded-full shadow-xl shadow-red-500"
                />
              </div>
            </div>
            <div>
              <form
                onSubmit={joinRoom}
                className="max-w-full flex justify-center"
              >
                <input
                  type="text"
                  placeholder="Enter Room No.."
                  onChange={(e) => setRoom(e.target.value)}
                  value={room}
                  className="text-blue-500 focus:text-black text-lg md:text-xl font-bold p-3 rounded-l-lg bg-black focus:bg-blue-800 font-chakra"
                />
                <button className="bg-black text-blue-500 rounded-r-xl p-3 font-chakra">
                  Join Room
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinRoom;
