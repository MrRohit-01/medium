import { Link } from "react-router-dom";
interface SubHeading {
  subheading:string
  link:string
}
function SubHeading({subheading,link}:SubHeading){  
  return (
    <>
    <h1 className="text-4xl font-bold text-center">{subheading}{link}</h1>
    </>
  )
}
export default SubHeading;