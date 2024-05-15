import React from 'react';

interface InputDataProps {
  name: string,
  placeholder:string
}
function InputData({name,placeholder}:InputDataProps) {
  return (
    <div className={"p-4"}>
    <label htmlFor='inputid' className={"font-medium"}>{name}</label><br/>
    <input id= "inputid"placeholder={placeholder || "enter data"} className={"border-2 outline-none mt-2 py-1 px-3 font-normal rounded-md w-96"} />  
    </div>
  );
}

export default InputData;
