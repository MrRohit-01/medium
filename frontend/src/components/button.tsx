import axios from 'axios';
import React from 'react';

interface Inputbuttonprops {
button:string
email:string
password:string
username?:string
}
function ButtonData({button,email,password,username}:Inputbuttonprops) {
  const dataFetch = async () => {
    try {
        const data = await axios.post("https://backend.rohitkumarbarada.workers.dev/api/v1/user/signup", {
            email: email,
            name: username,
            password: password
        });
        localStorage.setItem("token",data.data.jwt)
    } catch (error) {
        console.error("Signup failed:", error);
        alert("Signup failed. Please try again.");
    }
};

  return (
    <div className={"p-4 pt-5"}>
   <button className="w-96 bg-black text-white border rounded-md py-1.5 px-2 text-md font-medium" onClick={dataFetch} >{button}</button>
    </div>
  );
}

export default ButtonData;
