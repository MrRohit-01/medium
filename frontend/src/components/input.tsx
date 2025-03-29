import React from 'react';

interface InputDataProps {
  label: string,
  placeholder: string,
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string
  viewPassword?: boolean
}

function InputData({ label, placeholder, onchange, type }: Readonly<InputDataProps>) {
  const uniqueId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`; // Generate a unique ID based on the label

  return (
    <div>
      <div className={"py-4 pb-0 max-md:4/5"}>
        <label htmlFor={uniqueId} className={"font-medium"}>{label}</label><br />
        <input
          id={uniqueId} // Use the unique ID here
          placeholder={placeholder || "enter data"}
          onChange={onchange}
          className={"max-sm:w-full border-2 outline-none mt-2 py-2 px-3 font-normal rounded-md w-96"}
          type={type ?? "text"}
        />
      </div>
    </div>
  );
}

export default InputData;
