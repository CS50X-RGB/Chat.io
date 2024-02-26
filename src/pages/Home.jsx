import { useSelector } from "react-redux";
import SideBar from "../Components/Sidebar";
import image from "../assests/ChatAppHEro.webp";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { CardWrapper } from "../Components/Wrappers/CarWrapper";
import Footer from "../Components/Footer";
import ChatRoom1 from "../assests/ChatRoom.png";
import Join from "../assests/Join.png";
import History from "../assests/History.png";
import { Link } from "react-router-dom";

const TypingAnimation = ({ text, speed }) => {
  const [displayingText, setDisplayingText] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    const animateText = async () => {
      for (let i = 0; i <= text.length; i++) {
        await new Promise((resolve) => {
          setTimeout(resolve, speed);
        });
        setDisplayingText(text.slice(0, i));
      }
    };
    animateText().then(() => {
      setDisplayingText(text);
    });
  }, [text, speed]);
  return (
    <motion.div
      className="text-pink-800 bg-[#7bec39] bg-clip-border-2 bg-clip-border-pink-800 rounded-l-full rounded-r-full px-4"
      initial={{ opacity: 1 }}
      animate={controls}
    >
      {displayingText}
    </motion.div>
  );
};
export default function Home() {
  const isAuth = useSelector((store) => store.auth.isAuth);
  const fadeInControls = useAnimation();
  const fadeInRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (fadeInRef.current) {
        const { top } = fadeInRef.current.getBoundingClientRect();
        const isVisible = top < window.innerHeight - 100;
        if (isVisible) {
          fadeInControls.start({ opacity: 1, transition: 900000 });
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fadeInControls]);

  return (
    <>
      <div className="flex flex-col pt-[5rem] gap-4">
        <div className="flex flex-row justify-around p-8 bg-gradient-to-bl from-blue-300 via-pink-400 to-blue-500">
          {isAuth ? <SideBar /> : null}
          <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-blue-900 font-extrabold text-2xl text-left md:text-5xl font-chakra flex flex-col items-center justify-center">
              Welcome to RohanChat.io –
              <TypingAnimation text={"Connect , Join , Chat"} speed={200} />
            </h1>
            <p className="text-xl text-center md:text-2xl font-chakra font-bold">
              Chat.io is your go-to platform for connecting with people around
              the world and chatting in real-time.
            </p>
          </div>
          <motion.div
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1.1, y: 0 }}
            className="w-[60vh] md:w-[40vh] pt-[5rem] pr-[.3rem]"
            transition={{
              type: "spring",
              stiffness: 0.6,
              delay: 7,
              damping: 1,
              repeat: Infinity,
              yoyo: Infinity,
              repeatType: "mirror",
            }}
          >
            <img
              src={image}
              className="rounded-xl rotate-12"
              alt="ChatappHero"
            />
          </motion.div>
        </div>
      </div>
      <div className="bg-gradient-to-tl from-blue-300 via-pink-400 to-blue-500 p-3 h-1/3 gap-6">
        <h1 className="text-6xl font-bold text-[#7bec39] font-ostwald text-center p-5">
          How does this work?
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          ref={fadeInRef}
          animate={fadeInControls}
          className="flex flex-col md:flex-row justify-center items-center md:justify-around p-[3rem] gap-4 rounded-full"
        >
          <CardWrapper className="rotate-0 h-[80vh] overflow-auto flex flex-col transform translate-x-5 translate-y-0">
            <div className="bg-blue-300 rounded-l-xl w-[30vh] p-[.2rem] md:p-[2rem]">
              <h1 className="flex text-3xl items-center justify-center h-[20vh]">
                Join Rooms
              </h1>
              <p className="text-black flex flex-col gap-[1rem]">
                Create Rooms with specific themes that you need. Choose from a
                variety of colors to customize your chat room.
                <div className="flex flex-row gap-4">
                  <div className="w-4 h-4 border border-black rounded-full bg-black shadow-xl shadow-black" />
                  <div className="w-4 h-4 border border-pink-400 rounded-full bg-pink-400 shadow-xl shadow-pink-400" />
                  <div className="w-4 h-4 border border-blue-800 rounded-full bg-blue-800 shadow-xl shadow-blue-800" />
                  <div className="w-4 h-4 border border-red-500 rounded-full bg-red-500 shadow-xl shadow-red-500" />
                  <div className="w-4 h-4 border border-cyan-500 rounded-full bg-cyan-500 shadow-xl shadow-cyan-500" />
                </div>
              </p>
            </div>
            <img
              src={Join}
              className="w-[50%] p-[.2rem] md:p-[1.2rem] rounded-2xl rotate-0 md:rotate-12 shadow-xl shadow-blue-500"
              alt="PicOne"
            />
          </CardWrapper>
          <CardWrapper className="rotate-0 h-[80vh] overflow-auto flex flex-col transform translate-x-5 translate-y-0">
            <img
              src={ChatRoom1}
              className="w-[50%] p-[1.2rem] rounded-2xl -rotate-12 shadow-xl shadow-blue-500"
              alt="PicOne"
            />
            <div className="bg-blue-400 w-[30vh] p-[.2rem] md:p-[2rem] rounded-r-xl">
              <h1 className="flex text-xl md:text-3xl items-center justify-center h-[20vh]">
                Chatting rooms
              </h1>
              <p className="text-black text-sm flex flex-col">
                Chat with people with simple UI just click on the Send Message
                and send message to everyone present in the room
                {isAuth ? (
                  <>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0px 0px 8px rgb(2,255,255)",
                        boxShadow: "0px 0px 16px rgb(0,0,0)",
                      }}
                      className="bg-black text-blue-500 text-center px-[1rem] py-[.5rem] rounded-xl"
                    >
                      <Link to={"/join"}>Join Room</Link>
                    </motion.button>
                    <p>Just Join Room and start chatting..</p>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/register"}
                      className="bg-black text-blue-500 text-center px-[1rem] py-[.5rem] rounded-xl"
                    >
                      Login
                    </Link>
                    <p>Just Register to get started</p>
                  </>
                )}
              </p>
            </div>
          </CardWrapper>
          <CardWrapper className="-rotate-180 h-[80vh] transform translate-x-0 translate-y-[-5rem]">
            <img
              src={History}
              alt="History"
              className="w-[60%] p-[1.2rem] rounded-2xl -rotate-12 shadow-xl shadow-blue-500"
            />
            <div className="text-blue-400 w-[30vh] p-[.2rem] md:p-[2rem] rounded-r-xl">
              <h1 className="flex text-xl md:text-3xl items-center justify-center h-[20vh]">
                History
              </h1>
              <p className="text-blue-400 text-sm flex flex-col">
                View Your Profile Update Details See your History with others
                View Ohers Profile and again join the room to again chat with
                them
                {isAuth ? (
                  <>
                    <Link
                      to={"/myProfile"}
                      className="bg-blue-600 text-black text-center px-[1rem] py-[.5rem] rounded-xl"
                    >
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/register"}
                      className="bg-blue-600 text-black text-center px-[1rem] py-[.5rem] rounded-xl"
                    >
                      Login
                    </Link>
                    <p>Just Register to get started</p>
                  </>
                )}
              </p>
            </div>
          </CardWrapper>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
