import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import JoinRoom from "./pages/joinRoom";
import LeaveRoomAndSendMessage from "./pages/leaveandSendMess";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewProfile from "./pages/ViewProfile";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
let socket = io.connect("http://localhost:3001");
export const userServer = `http://localhost:3001/api/v1.1/users`;

export default function App() {
  const { isAuth } = useSelector((state) => state.auth);
  const isLeaveRoomPage = window.location.pathname.startsWith('/chat');
  console.log(window.location.pathname.startsWith('/chat')); 
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuth ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/join" element={<JoinRoom socket={socket} />} />
            <Route
              path="/chat/:id/:room"
              element={<LeaveRoomAndSendMessage socket={socket} />}
            />
            <Route path="/myProfile" element={<Profile />} />
            <Route path="/profile/:id" element={<ViewProfile/>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/join" element={<Navigate to="/login" />} />
            <Route path="/chat/:room" element={<Navigate to="/login" />} />
            <Route path="/myProfile" element={<Navigate to="/login" />} />
          </>
        )}

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!isLeaveRoomPage && <Footer />}
    </>
  );
}
