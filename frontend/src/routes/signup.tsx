import { useState } from 'react';
import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";
import { SignupType } from "@rohitnpmdata/common-data-app";
import { useNavigate } from 'react-router-dom';

function Signup() {
  // const navigate = useNavigate();
  return (
  

      <div className="flex max-md:flex-col md:justify-between items-center h-screen bg-grey-500">
        <div className="mx-md: w-full md:w-1/2 h-screen flex justify-center items-center bg-[#fefffe]">
          <div>
            <Heading headline="Create an account" />
            <SubHeading subheading="Already have an account?" link={"Signin"} linkPath="signin"/>
            <div className=" flex justify-center">
            <div className="w-full">
                <InputField />
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

  );
}

function InputField() {
  const [inputProps, setInputProps] = useState<SignupType>({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const signInAsGuest = async () => {
    const guestData = {
      email: "rohit000@gmail.com",
      password: "123456789",
    };

    try {
      const response = await fetch("https://backend.rohitkumarbarada.workers.dev/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
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
      <InputData onchange={(e)=>{
        setInputProps({
          ...inputProps,
          name:e.target.value
        })}} placeholder="Enter your name" type="text" label="name" />
      <InputData onchange={(e)=>{
        setInputProps({
          ...inputProps,
          email:e.target.value
        })
        console.log(e.target.value)
      }} placeholder="example@gmail.com" type="text" label="email" />
      <InputData onchange={(e)=>{
        setInputProps({
          ...inputProps,
          password:e.target.value
        })}}
         placeholder="******" type="password" label="password" />
      <ButtonData 
        name={inputProps.name} 
        email={inputProps.email} 
        password={inputProps.password} 
        button="Sign up" 
        mode="signup" 
      />
      <button 
        onClick={signInAsGuest} 
        className="max-sm:w-full w-96 bg-black text-white border rounded-md py-1.5 px-2 text-md font-medium"
      >
        Sign in as Guest
      </button>
    </>
  );
}

export default Signup;
