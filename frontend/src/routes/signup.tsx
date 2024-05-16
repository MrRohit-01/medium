import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";

function Signup(){
  return(
    <>
    <div>
    <Heading headline="Create an account"/>
    <SubHeading subheading="Already have an account?" link ={"Login"}/>
    <InputData placeholder="Enter Your user name" name={"Username"}/>
    <ButtonData button={"Sign Up"}/>
    </div>
    <div>
      {/* <LoginReview data={""} name={"Jules winnfield"} position={"CEO,Acme inc"}/> */}
    </div>
    </>
  )
}

export default Signup;