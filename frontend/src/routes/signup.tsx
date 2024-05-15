import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";

function Signup(){
  return(
    <>
    <Heading headline="Create an account"/>
    <SubHeading subheading="already have an account" link ={"login"}/>
    <InputData placeholder="Enter Your user name" name={"Username"}/>
    <ButtonData button={"Sign Up"}/>
    </>
  )
}

export default Signup;