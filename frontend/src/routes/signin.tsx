import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";
import {useNavigate } from 'react-router-dom';

import { useState } from "react";
import { SigninType } from "@rohitnpmdata/common-data-app";

function Signin() {
    const navigate = useNavigate(); 
  return (
    <>
        <div className="flex max-md:flex-col md:justify-between items-center h-screen bg-grey-500">
        <div className="mx-md: w-full md:w-1/2 h-screen flex justify-center items-center bg-[#fefffe]">
          <div>
            <Heading headline="Login to an Account" />
            <SubHeading subheading="Already have an account?" linkPath={""} link="Signup" />
            <div className=" flex justify-center">
              <div className="w-full">
                <InputFeild />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 max-md:hidden flex justify-center bg-[#f2f4f7] h-screen items-center">
          <div className="w-9/12">
            <LoginReview />
          </div>
        </div>
      </div>
    </>
  )
}
function InputFeild() {
  const [inputprops, setinputprops] = useState<SigninType>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const signInAsGuest = async () => {
    const guestData = {
      email: "rohit000@gmail.com",
      password: "123456789"
    };

    try {
      const response = await fetch("https://backend.rohitkumarbarada.workers.dev/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(guestData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Guest signed in successfully:", data);
        localStorage.setItem("token", data.jwt); // Store the token in localStorage
        navigate("/blogs"); // Navigate after storing the token
      } else {
        console.error("Failed to sign in as guest");
      }
    } catch (error) {
      console.error("Error during guest sign-in:", error);
    }
  };

  return (
    <>
      <InputData onchange={(e) => {
        setinputprops({
          ...inputprops,
          email: e.target.value
        })
      }} placeholder="example@gmail.com" type="text" label={"Email"} />
      <InputData onchange={(e) => {
        setinputprops({
          ...inputprops,
          password: e.target.value
        })
      }} placeholder="******" type={"password"} label={"Password"} />
      <ButtonData 
        email={inputprops.email} 
        password={inputprops.password} 
        button={"Sign in"} 
        mode={"signin"} 
      />
      <button 
        onClick={signInAsGuest} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Sign in as Guest
      </button>
    </>
  );
}

export default Signin;
