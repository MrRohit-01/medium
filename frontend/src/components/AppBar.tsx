import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import randomColor from "./randomColor"; // Import the randomColor function
import { FaUserCircle, FaBook, FaPowerOff } from "react-icons/fa"; // Updated icons

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
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

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
        console.log(response.data);
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
        id: storedUserId,
      }));
    } else {
      fetchUser();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="py-1 w-full flex justify-between sm:justify-around max-md:px-5 border">
      <Link to={"/blogs"}>
        <div className="mt-2 font-medium text-xl cursor-pointer">Medium</div>
      </Link>
      <div className="flex gap-3 relative">
        <Link to={"/blog/create"}>
          <img
            src="https://img.icons8.com/?size=100&id=izf3IxWTfYti&format=png&color=000000"
            className="w-8 h-8 mt-1.5 cursor-pointer"
          />
        </Link>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${randomColor()} cursor-pointer`}
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-12 bg-white border rounded shadow-lg w-44">
            <ul className="text-sm">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => navigate("/profile")}
              >
                <FaUserCircle /> Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => navigate("/me/posts")}
              >
                <FaBook /> My Posts
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={handleLogout}
              >
                <FaPowerOff /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
