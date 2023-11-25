import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function ViewProfile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const history = useNavigate();

  useEffect(() => {
    if (id === 'YOU') {
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
      <Header />
      <div className="bg-blue-800 p-5 flex flex-col justify-center pt-[10rem] items-center">
        {user && (
          <div className="bg-blue-400 p-8 flex flex-col justify-center items-center rounded-2xl shadow-2xl shadow-pink-600 space-y-4">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                className="h-1/2 w-full flex justify-center"
                alt="profilePic"
              />
            ) : (
              <div className="text-white border p-4 font-chakra border-black rounded-full bg-blue-400 text-4xl font-bold shadow-2xl shadow-pink-700 m-2">
                {user.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
            )}
            <h1 className="text-pink-800 text-3xl font-chakra font-semibold border-t-2 border-b-2 border-pink-800">
              {user.name}
            </h1>
            <h1 className="text-pink-700 font-chakra text-2xl border-b-2 border-t-2 border-pink-800">
              {user.email}
            </h1>
            <h1 className="text-pink-700 font-chakra text-2xl border-b-2 border-t-2 border-pink-800">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ViewProfile;
