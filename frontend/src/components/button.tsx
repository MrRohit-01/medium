import axios from 'axios';
import {useNavigate } from 'react-router-dom';

interface Inputbuttonprops {
  button: string
  email: string
  password: string
  name?: string
  mode: "signup" | "signin"
}
function ButtonData({ button, email, password, name, mode }: Inputbuttonprops) {
  const navigate = useNavigate(); 
  const dataFetch = async () => {
    const payload = name ? {
      email: email,
      name: name,
      password: password
    } : {
      email: email,
      password: password
    }
      try {
        const data = await axios.post("https://backend.rohitkumarbarada.workers.dev/api/v1/user/"+mode, payload);
        localStorage.setItem("token", data.data.jwt)
        navigate("/blogs")






      } catch (error) {
        console.error(`${mode.charAt(0) + mode.slice(1)} failed:`, error);
        alert(`${mode.charAt(0) + mode.slice(1)} failed: Please try again.`);
      }
  };

  return (
    <div className={"p-4 pt-5"}>
      <button className=" max-sm:w-4/5 w-96 bg-black text-white border rounded-md py-1.5 px-2 text-md font-medium" onClick={dataFetch} >{button}</button>
    </div>
  );
}

export default ButtonData;
