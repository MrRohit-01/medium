import React from 'react';

interface InputDataProps {
  label: string,
  placeholder:string
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string
}
  function InputData({ label, placeholder, onchange, type }: InputDataProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onchange(e);
    };
  
    return (
      <div>
        <div className={"py-4 pb-0 max-md:4/5"}>
          <label htmlFor='inputid' className={"font-medium"}>{label}</label><br/>
          <input
            id="inputid"
            placeholder={placeholder || "enter data"}
            onChange={handleInputChange} 
            className={"max-sm:w-full border-2 outline-none mt-2 py-2 px-3 font-normal rounded-md w-96"}
            type={type || "text"}
          />  
        </div>
      </div>
    );
  }
  
  

export default InputData;
