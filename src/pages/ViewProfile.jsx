import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../Components/Sidebar";

function ViewProfile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const history = useNavigate();

  useEffect(() => {
    if (id === "YOU") {
      history("/myProfile");
    } else {
      const fetchData = async () => {
        try {
          const firstResponse = await axios.get(
            `http://localhost:3001/api/v1.1/users/getUser/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          const secondResponse = await axios.get(
            `http://localhost:3001/api/v1.1/users/getUserData/${firstResponse.data._id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log(secondResponse.data);
          setUser(secondResponse.data.user);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [id, history]);

  return (
    <>
      {!user ? (
        <div className="text-chakra bg-black flex justify-center items-center w-[100%] text-[3rem] text-blue-500  h-[100vh] font-chakra">
          Loading...
        </div>
      ) : (
        <>
          <div className="bg-blue-800 flex gap-[0rem] md:gap-[20rem]">
            <SideBar />
            <div className="p-5 flex flex-col justify-center pt-[10rem] items-center min-h-full">
              {user && (
                <div className="bg-black min-w-[50vh] p-8 flex flex-col justify-center gap-7 items-center rounded-2xl shadow-2xl border border-pink-600 shadow-pink-600 space-y-4">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      className="h-1/2 w-full flex justify-center"
                      alt="profilePic"
                    />
                  ) : (
                    <div className="text-white border p-4 font-chakra border-black rounded-full bg-blue-400 text-4xl font-bold shadow-2xl shadow-pink-700 m-2 ">
                      {user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  )}
                  <h1 className="text-pink-800 text-2xl md:text-4xl font-chakra font-semibold">
                    Name : {user.name}
                  </h1>
                  <h1 className="text-pink-700 font-chakra text-3xl ">
                    Email : {user.email}
                  </h1>
                  <h1 className="text-pink-700 font-chakra text-3xl">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </h1>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ViewProfile;
