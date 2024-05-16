import React from 'react';

interface InputDataProps {
  name: string,
  placeholder:string
  onchange:(value:string)=>void
}
function InputData({name,placeholder,onchange}:InputDataProps) {
  return (
    <div>
    <div className={"p-4 pb-0"}>
    <label htmlFor='inputid' className={"font-medium"}>{name}</label><br/>
    <input id= "inputid"placeholder={placeholder || "enter data"} onChange={(e)=>onchange(e.target.value )}className={"border-2 outline-none mt-2 py-2 px-3  font-normal rounded-md w-96"} />  
    </div>
    </div>
  );
}

export default InputData;
