import { useSelector } from "react-redux";
import SideBar from "../Components/Sidebar";
import image from "../assests/ChatAppHEro.webp";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CardWrapper } from "../Components/Wrappers/CarWrapper";

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
  console.log(isAuth);
  return (
    <>
      <div className="flex flex-col pt-[5rem] gap-4">
        <div className="flex flex-row justify-around p-8 bg-gradient-to-bl from-blue-300 via-pink-400 to-blue-500">
          {isAuth ? <SideBar /> : null}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-blue-900 font-extrabold text-2xl text-left md:text-5xl  font-chakra  flex flex-col items-center justify-center">
              Welcome to RohanChat.io –
              <TypingAnimation text="Connect Join Chat" speed={100000} />
            </h1>
            <p className="text-xl md:text-2xl font-chakra font-bold">
              Chat.io is your go-to platform for connecting with people around
              world and chatting in real-time.
            </p>
          </div>
          <img
            src={image}
            className="w-[20vh] h-[30vh] md:w-1/4 md:h-1/4 rounded-xl rotate-6 pt-70"
            alt="ChatappHero"
          />
        </div>
      </div>
      <div className="bg-blue-900 p-3 h-1/3 gap-6">
        <h1 className="text-4xl font-bold text-[#7bec39] font-ostwald text-center p-5">
          How does this work?
        </h1>
        <div className="flex flex-col md:flex-row justify-around p-[1rem] gap-4 rounded-full border border-black">
          <CardWrapper className="rotate-0 transform translate-x-5 translate-y-0">
            1st
          </CardWrapper>
          <CardWrapper className="rotate-120 transform translate-x-0 translate-y-5">
            2nd
          </CardWrapper>
          <CardWrapper className="-rotate-180 transform translate-x-0 translate-y-[-5rem]">
            3rd
          </CardWrapper>
        </div>
      </div>
    </>
  );
}
