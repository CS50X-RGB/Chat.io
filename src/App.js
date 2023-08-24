import { Navigate, Route, Routes } from 'react-router-dom';
import JoinRoom from './pages/joinRoom';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import Home from './pages/Home';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile';
import { useEffect } from 'react';
import LeaveRoomAndSendMessage from './pages/leaveandSendMess';
export const userServer = `http://localhost:3001/api/v1.1/users`

export default function App() {
  const auth = localStorage.getItem("auth") === 'true';
  return (  
    <>
    <Routes>
      <Route path='/join' element={<JoinRoom/>}/>
      <Route path='/chat/:room' element={<LeaveRoomAndSendMessage/>}/>
      <Route path='/myProfile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/*' element={<NotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}