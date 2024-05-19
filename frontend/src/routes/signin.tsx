import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";
import { useState } from "react";
import { SigninType } from "@rohitnpmdata/common-data-app";

function Signin() {
  return (
    <>
      <div className="flex justify-between items-center h-screen bg-grey-500">
        <div className="mx-md: w-full md:w-1/2 h-screen flex justify-center items-center bg-[#fefffe]">
          <div>
            <Heading headline="Create an account" />
            <SubHeading subheading="Already have an account?" link={"Signup"} />
          <div className={" flex justify-center"}>
            <div>
            <InputFeild/>
          </div>
          </div>
          </div>
         </div>
        <div className=" max-md:hidden md:w-1/2 flex justify-center bg-[#f2f4f7] h-screen items-center">
          <div className="w-9/12">
            <LoginReview />
          </div>
        </div>
      </div>
    </>
  )
}
function InputFeild(){
  const [inputprops,setinputprops]=useState<SigninType>({
    email:"",
    password:""
  })
console.log(inputprops)
  return(<>
            <InputData onchange={(e)=>{
              setinputprops({
                ...inputprops,
                email:e.target.value
            })
            }} placeholder="example@gmail.com" type="text"label={"Email"} />
            <InputData onchange={(e)=>{
              setinputprops({
                ...inputprops,
                password:e.target.value
            })}} placeholder="******" type={"password"} label={"Password"} />
            <ButtonData email={inputprops.email} password={inputprops.password} button={"Sign in"} mode={"signin"}  />
  </>)
}

export default Signin;  