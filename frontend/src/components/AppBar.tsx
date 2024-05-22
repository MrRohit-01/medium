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
        setUser(response.data);
      } catch (e) {
        navigate("/signup");
      }
    };

    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUser((prevUser) => ({
        ...prevUser,
        name: storedUserName,
      }));
    } else {
      fetchUser();
    }
  }, [navigate]);

  return (
    <div className="py-1 w-full flex justify-around border">
      <Link to={"/blogs"}>
        <div className="mt-2 font-medium text-xl cursor-pointer">Medium</div>
      </Link>
      <Avatar size="big" name={user.name} />
    </div>
  );
};
