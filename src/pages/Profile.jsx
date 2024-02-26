import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import SideBar from "../Components/Sidebar";
import { IoMdAdd } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import Footer from "../Components/Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { isAuth, token } = useSelector((state) => state.auth);
  const [recivers, setRecivers] = useState([]);
  const [chatters, setChatters] = useState([]);
  const [image, setImage] = useState("");
  const [imageUpdated, setImageUpdated] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editEamil, setEditEamil] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleToggleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handleToggleEmailEdit = (e) => {
    e.preventDefault();
    setEditEamil(!editEamil);
  };
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImage(reader.result);
        setImageUpdated(true);
      };

      reader.onerror = (error) => {
        console.error(error);
      };
    }
  };

  const handleUpdateEdit = async () => {
    try {
      const response = await axios.put(
        "https://chat-ioserver.onrender.com/api/v1.1/users/updateDetails",
        {
          name: edit ? name : undefined,
          email: editEamil ? email : undefined,
          profilePic: imageUpdated ? image : undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setName(response.data.user.name);
        setImage(response.data.user.profilePic);
        setEmail(response.data.user.email);
        window.location.reload();
      }
      toast.custom((t) => (
        <div className="border-2 border-black bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-black font-chakra p-3 rounded-md">
          <strong>{response.data.message}</strong>
        </div>
      ));
    } catch (error) {
      const errorMessages = error.response?.data?.errors?.map((error) => error.message).join(', ');
      toast.custom((t) => (
        <div className="border-2 border-white bg-gradient-to-tr from-red-400 to-red-700 text-white font-chakra p-3 rounded-md">
          <strong>Error:</strong> {errorMessages || 'An error occurred'}
        </div>
      ));
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://chat-ioserver.onrender.com/api/v1.1/users/myProfile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        if (response.data.user) {
          const chatResponse = await axios.get(
            `https://chat-ioserver.onrender.com/api/v1.1/chat/${response.data.user._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          console.log(chatResponse);
          const updatedRecivers = new Set();
          const chatter = new Set();
          chatResponse.data.message.forEach((message) => {
            updatedRecivers.add(message.room);
            message.content.forEach((content) => {
              if (content.senderName !== response.data.user.name) {
                chatter.add(content.senderName);
              }
              chatter.add("YOU");
            });
          });
          console.log(chatter);
          setChatters(Array.from(chatter));
          setRecivers(Array.from(updatedRecivers));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    console.log(recivers.length);
    fetchData();
  }, [isAuth, token]);

  return (
    <>
      {!user ? (
        <div className="text-chakra bg-black flex justify-center items-center w-[100%] text-[3rem] text-blue-500  h-[100vh] font-chakra">
          Loading...
        </div>
      ) : (
        <div className="bg-[#121636] pt-[5rem]">
          <div className="flex m-[2rem] flex-col md:flex-row justify-around  gap-3">
            {isAuth && <SideBar />}
            <div className="flex justify-around flex-row flex-1 text-white rounded-2xl shadow-2xl shadow-pink-300 bg-cyan-400/30 my-[6rem] text-center w-full md:w-1/2 max-h-[25%]">
              <div className="flex p-[1rem] md:p-[2rem] flex-col justify-center items-center gap-3">
                {isAuth && user ? (
                  <>
                    <div
                      className={`rounded-full ${
                        !image ? "p-[1rem]" : "p-[.5rem]"
                      } relative border-2 border-text shadow-2xl shadow-black`}
                    >
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        className="hidden"
                        onChange={convertToBase64}
                      />
                      <label htmlFor="fileInput" className="cursor-pointer">
                        {user.profileImage ? (
                          <>
                            <img
                              src={user.profileImage}
                              alt="ProfileImage"
                              className="rounded-full w-[10rem] h-[10rem] object-cover"
                            />
                            <IoMdAdd
                              size={50}
                              className="fill-blue-500 z-30 absolute -right-[1rem] bottom-[0.1rem]"
                            />
                          </>
                        ) : (
                          <IoMdAdd
                            size={50}
                            className="fill-blue-500 z-30 absolute -right-[.8rem] bottom-[2rem]"
                          />
                        )}
                      </label>
                    </div>
                    <h1 className="font-chakra text-2xl font-bold">
                      How're you doin'?
                    </h1>
                    {edit ? (
                      <>
                        <div className="flex flex-row justify-center items-center gap-4">
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-black p-2 text-xl text-black bg-text"
                          />
                          <button
                            onClick={handleToggleEdit}
                            className="fill-blue-500"
                            type="button"
                          >
                            <FaPencilAlt size={34} className="fill-blue-600" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row justify-center items-center gap-5">
                          <span className="text-xl font-ostwald md:text-5xl">
                            Hi {user.name}
                          </span>
                          <button onClick={handleToggleEdit} type="button">
                            <FaPencilAlt size={34} className="fill-blue-500" />
                          </button>
                        </div>
                      </>
                    )}
                    {editEamil ? (
                      <div className="flex flex-row justify-center items-center gap-4">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full font-chakra rounded-xl border border-black p-2 text-xl text-black bg-text"
                        />
                        <button
                          onClick={handleToggleEmailEdit}
                          className="fill-blue-500"
                          type="button"
                        >
                          <FaPencilAlt size={34} className="fill-blue-600" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-row justify-center items-center gap-5">
                          <span className="text-xl font-ostwald md:text-3xl">
                            {user.email}
                          </span>
                          <button onClick={handleToggleEmailEdit} type="button">
                            <FaPencilAlt size={34} className="fill-blue-500" />
                          </button>
                        </div>
                      </>
                    )}
                    <Link className="bg-blue-700 rounded-xl font-ostwald shadow-blue-500 shadow-xl px-6 py-3" to={"/forgotPassword"}>Reset Password?</Link>
                    {user.createdAt && (
                      <h1 className="font-chakra text-2xl font-bold">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </h1>
                    )}
                    {edit || editEamil || imageUpdated ? (
                      <button
                        onClick={handleUpdateEdit}
                        type="submit"
                        className="bg-blue-600 shadow-2xl shadow-black px-6 py-3 text-2xl rounded-full font-chakra hover:bg-black hover:text-blue-500"
                      >
                        Update Details
                      </button>
                    ) : (
                      <></>
                    )}
                    <div className="flex p-6 flex-col justify-center items-center">
                      <h1 className="text-xl md:text-3xl font-ostwald">
                        No. of rooms joined are : {recivers.length}
                      </h1>
                    </div>
                  </>
                ) : (
                  <p>Welcome</p>
                )}
              </div>
              <div className="flex flex-end bg-gradient-to-r from-blue-300 via-cyan-500 to-pink-500 shadow-top-left shadow-2xl bg-blend-darken mix-blend-normal brightness-110 blur w-[10rem] rounded-r-full" />
            </div>
            <div className="flex justify-around flex-row flex-1 text-white rounded-2xl shadow-2xl shadow-pink-300 bg-cyan-400/30 my-[6rem] text-center w-full md:w-1/2 max-h-[25%]">
              <div className="flex p-[2rem] font-ostwald flex-col justify-center items-center">
                <h1 className="text-2xl md:text-5xl">History</h1>
                <h3 className="text-lg md:text-3xl flex">
                  See Your Joined Room:{" "}
                </h3>
                <div className="grid grid-rows-2 md:grid-cols-2 p-5 gap-4">
                  {recivers.map((room, id) => (
                    <React.Fragment key={id}>
                      <Link
                        to={`/chat/${user._id}/${room}`}
                        className="bg-cyan-500 flex flex-col px-12 py-3 my-3 rounded-full shadow-2xl shadow-pink-700/60"
                      >
                        Room id : {room}
                        <h1 className="text-sm font-ostwald">
                          `Chatters in the room : {chatters.length}
                        </h1>
                      </Link>
                      <div className="overflow-y space-y-4 flex flex-col items-center justify-center ring-2 ring-pink-300 rounded-xl">
                        {chatters.map((talker, talkerId) => (
                          <Link
                            to={`/profile/${talker}`}
                            className="cursor-pointer text-pink-400 border-b-2 border-b-black"
                            key={talkerId}
                          >
                            {talker}
                          </Link>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex flex-end bg-gradient-to-r from-blue-300 via-cyan-500 to-pink-500 shadow-top-left shadow-2xl bg-blend-darken mix-blend-normal brightness-110 blur w-[5rem] md:w-[10rem] rounded-r-full"></div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
