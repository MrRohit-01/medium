import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface ResponseData {
  name: string;
  email: string;
  id: string;
}

export const AppBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ResponseData>({
    name: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<ResponseData>("https://backend.rohitkumarbarada.workers.dev/api/v1/user/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userId", response.data.id);
        setUser(response.data);
        console.log(response.data)
      } catch (e) {
        navigate("/");
      }
    };

    const storedUserName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");
    if (storedUserName && storedUserId) {
      setUser((prevUser) => ({
        ...prevUser,
        name: storedUserName,
        id:storedUserId
      }));
    } else {
      fetchUser();
    }
  }, [navigate]);

  return (
    <div className="py-1 w-full flex  justify-between sm:justify-around max-md:px-5 border">
      <Link to={"/blogs"}>
        <div className="mt-2 font-medium text-xl cursor-pointer">Medium</div>
      </Link>
      <div className="flex gap-3 ">
        <Link to={"/blog/create"}>
      <img src="https://img.icons8.com/?size=100&id=izf3IxWTfYti&format=png&color=000000" className="w-8 h-8 mt-1.5 cursor-pointer "/></Link>
      <Avatar size="big" name={user.name} />
      console.log(user.name)
    </div>
    </div>
  );
};
