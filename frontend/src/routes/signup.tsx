import React, { useState } from 'react';
import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";
import { SignupType } from "@rohitnpmdata/common-data-app";

function Signup() {
  return (
    <>
      <div className="flex justify-between items-center h-screen bg-grey-500">
        <div className="w-1/2 h-screen flex justify-center items-center bg-[#fefffe]">
          <div>
            <Heading headline="Create an account" />
            <SubHeading subheading="Already have an account?" link={"Signin"} />
            <div className="flex justify-center">
              <div>
                <InputField />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center bg-[#f2f4f7] h-screen items-center">
          <div className="w-9/12">
            <LoginReview />
          </div>
        </div>
      </div>
    </>
  );
}

function InputField() {
  const [inputProps, setInputProps] = useState<SignupType>({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (name: string, value: string) => {
    setInputProps({
      ...inputProps,
      [name]: value
    });
  };

  return (
    <>
      <InputData onchange={handleInputChange} placeholder="Enter your name" type="text" name="name" />
      <InputData onchange={handleInputChange} placeholder="example@gmail.com" type="text" name="email" />
      <InputData onchange={handleInputChange} placeholder="******" type="password" name="password" />
      <ButtonData {...inputProps} button="Sign up" mode="signup" />
    </>
  );
}

export default Signup;
