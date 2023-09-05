import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; // Import useSelector
import axios from "axios";
import Header from "../Components/Header";

export default function Profile() {
  const [user, setUser] = useState(null);
  const  isAuth  = useSelector((state) => state.auth.isAuth); 

  useEffect(() => {
    if (isAuth) {
      axios
        .get("http://localhost:3001/api/v1.1/users/myProfile",{
          headers:{
            'Content-Type':'application/json',
          },
        withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
        
    }
  }, [isAuth]);

  return (
    <div className="bg-[#121636]">
      <Header/>
      <div className="text-white text-center">
        {isAuth && user ? <p>Hi {user.name}</p> : <p>Welcome</p>}
      </div>
    </div>
  );
}
