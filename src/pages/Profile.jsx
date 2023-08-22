import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";

export default function Profile() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth") === "true";
    setAuth(storedAuth);
    if (storedAuth) {
      axios
        .get("http://localhost:3001/api/v1.1/users/myProfile",{
          headers:{
            'Content-Type':'application/json',
          },
        withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user);
          console.log(response.data.user.name + "Hi");
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  return (
    <div className="bg-[#121636]">
      <Header/>
      <div className="text-white text-center">
        {auth && user ? <p>Hi {user.name}</p> : <p>Welcome</p>}
      </div>
    </div>
  );
}
