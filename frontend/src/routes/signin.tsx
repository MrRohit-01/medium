import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";
import { useState } from "react";

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
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  return(<>
            <InputData onchange={setEmail} placeholder="example@gmail.com" name={"Email"} />
            <InputData onchange={setPassword} placeholder="******" name={"Password"} />
            <ButtonData email={email} password={password} button={"Sign in"} mode={"signin"}  />
  </>)
}

export default Signin;  