import React from 'react';

interface InputDataProps {
  name: string,
  placeholder: string,
  onchange: (name: string, value: string) => void, // Update the type of onchange
  type: "password" | "text"
}

function InputData({ name, placeholder, onchange, type }: InputDataProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract the name and value from the event target
    onchange(name, value); // Call onchange with the name and value
  };

  return (
    <div>
      <div className={"p-4 pb-0 max-md:4/5"}>
        <label htmlFor='inputid' className={"font-medium"}>{name}</label><br />
        <input
          id="inputid"
          placeholder={placeholder || "enter data"}
          onChange={handleInputChange} // Pass handleInputChange to onChange
          className={"max-sm:w-4/5 border-2 outline-none mt-2 py-2 px-3 font-normal rounded-md w-96"}
          type={type}
        />
      </div>
    </div>
  );
}

export default InputData;
