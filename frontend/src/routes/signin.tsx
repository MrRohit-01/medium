import InputData from "../components/input";
import ButtonData from "../components/button";
import Heading from "../components/heading";
import SubHeading from "../components/subheadling";
import LoginReview from "../components/login-review";

function Signin() {
  return (
    <>
      <div className="flex justify-between items-center h-screen bg-grey-500">
        <div className="w-1/2 h-screen flex justify-center items-center bg-[#fefffe]">
          <div>
            <Heading headline="Create an account" />
            <SubHeading subheading="Already have an account?" link={"Signup"} />
          <div className={" flex justify-center"}>
            <div>
            <InputData placeholder="example@gmail.com" name={"Email"} />
            <InputData placeholder="******" name={"Password"} />
            <ButtonData button={"Sign in"} />
          </div>
          </div>
          </div>
         </div>
        <div className="w-1/2 flex justify-center bg-[#f2f4f7] h-screen items-center">
          <div className="w-9/12">
            <LoginReview data={"The customer service I received was exceptional. The support team went above and beyond to address my concerns"} name={"Jules winnfield"} position={"CEO,Acme inc"} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin;