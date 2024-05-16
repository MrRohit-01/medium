import React from 'react';

interface Inputbuttonprops {
button:string
email:string
password:string
username?:string
}
function ButtonData({button,email,password,username}:Inputbuttonprops) {
  return (
    <div className={"p-4 pt-5"}>
   <button className="w-96 bg-black text-white border rounded-md py-1.5 px-2 text-md font-medium">{button}</button>
    </div>
  );
}

export default ButtonData;
