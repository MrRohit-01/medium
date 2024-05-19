import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";
import { useEffect, useState } from "react";

function Signup() {
useEffect(()=>{

})
 
  return (
    <>
      <div className="flex justify-between items-center h-screen bg-grey-500">
        <div className="w-1/2 h-screen flex justify-center items-center bg-[#fefffe]">
          <div>
            <Heading headline="Create an account" />
            <SubHeading subheading="Already have an account?" link={"Signin"} />
          <div className={" flex justify-center"}>
            <div>
            <InputFeild/>
            
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
  )
}
function InputFeild(){
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  return(<>
  <InputData onchange={setUsername} placeholder="example@gmail.com" name={"Username"} />
            <InputData onchange={setEmail} placeholder="example@gmail.com" name={"Email"} />
            <InputData onchange={setPassword} placeholder="******" name={"Password"} />
            <ButtonData username={username} email={email} password={password} button={"Sign up"} mode={"signup"}/>
  </>)
}
export default Signup;