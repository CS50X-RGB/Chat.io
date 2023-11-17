import Header from "../Components/Header";
import { useSelector } from "react-redux";
import SideBar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import image from "../assests/ChatAppHEro.webp";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

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
      <Header />
      <div className="flex flex-col pt-[5rem] gap-4">
        <div className="flex flex-row justify-around p-8 bg-gradient-to-bl from-blue-300 via-pink-400 to-blue-500">
        {isAuth ? <SideBar /> : null}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-blue-900 text-3xl text-left md:text-5xl font-chakra font-bold flex flex-col items-center justify-center">
              Welcome to RohanChat.io –
              <TypingAnimation text="Connect Join Chat" speed={2000} />
            </h1>
            <p className="text-2xl font-chakra font-bold">
              Chat.io is your go-to platform for connecting with people around
              world and chatting in real-time.
            </p>
          </div>
          <img
            src={image}
            className="w-1/4 h-1/4 rounded-xl rotate-6 pt-70"
            alt="ChatappHero"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
