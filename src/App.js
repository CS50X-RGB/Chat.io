import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JoinRoom from './pages/joinRoom';
import LeaveRoomAndSendMessage from './pages/leaveandSendMess';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

export const userServer = `http://localhost:3001/api/v1.1/users`;

export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {isAuth ? (
          <>
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/chat/:room" element={<LeaveRoomAndSendMessage />} />
            <Route path="/myProfile" element={<Profile />} />
          </>
        ) : (
          // Redirect to login if not authenticated
          <>
            <Route path="/join" element={<Navigate to="/login" />} />
            <Route path="/chat/:room" element={<Navigate to="/login" />} />
            <Route path="/myProfile" element={<Navigate to="/login" />} />
          </>
        )}

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}
