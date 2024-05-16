import InputData from "../components/input";
// import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";
import { useState } from "react";

function Signup() {
  const [,setTitle] = useState("")
  const [,setDescription] = useState("")
  const [,setPassword] = useState("")
  return (
    <>
      <div className="flex justify-between items-center h-screen bg-grey-500">
        <div className="w-1/2 h-screen flex justify-center items-center bg-[#fefffe]">
          <div>
            <Heading headline="Create an account" />
            <SubHeading subheading="Already have an account?" link={"Signin"} />
          <div className={" flex justify-center"}>
            <div>
            <InputData placeholder="Enter Your user name" name={"Username"} onchange={setTitle} />
            <InputData placeholder="example@gmail.com" name={"Email"} onchange={setDescription}/>
            <InputData placeholder="******" name={"Password"} onchange={setPassword} />
            {/* <ButtonData  button={"Sign up"} /> */}
          </div>
          </div>
        <LoginReview/>
        </div>
         </div>
        
      </div>
    </>
  )
}

export default Signup;