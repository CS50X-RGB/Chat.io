import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import "./index.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const JoinRoom = lazy(() => import("./pages/JoinRoom"));
const LeaveRoomAndSendMessage = lazy(() => import("./pages/LeaveandSendMess"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ViewProfile = lazy(() => import("./pages/ViewProfile"));

let socket = io.connect("http://localhost:3001");
export const userServer = `http://localhost:3001/api/v1.1/users`;

export default function App() {
  const { isAuth } = useSelector((state) => state.auth);
  // console.log(`App has token of ${token}`);
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuth ? (
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/join" element={<JoinRoom socket={socket} />} />
              <Route path="/resetPassword/:resetIdentifier" element={<ResetPassword />} />
              <Route path="/forgotPassword" element={<ForgetPassword />} />
              <Route
                path="/chat/:id/:room"
                element={<LeaveRoomAndSendMessage socket={socket} />}
              />
              <Route path="/myProfile" element={<Profile />} />
              <Route path="/profile/:id" element={<ViewProfile />} />
            </>
          ) : (
            <>
              <Route path="/resetPassword/:resetIdentifier" element={<ResetPassword />} />
              <Route path="/forgotPassword" element={<ForgetPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/join" element={<Navigate to="/login" />} />
              <Route path="/chat/:room" element={<Navigate to="/login" />} />
              <Route path="/myProfile" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
      <Footer />
    </>
  );
}
