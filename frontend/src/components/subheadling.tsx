import { Link } from "react-router-dom";
interface SubHeading {
  subheading:string
  link:string
  linkPath:string
}
function SubHeading({subheading,link,linkPath}:SubHeading){  
  return (
    <div className={"flex gap-1 justify-center text-md text-center mt-2"}>
    <p className="">{subheading}</p>
    <Link to={`/${linkPath}`} className=" underline" >{link}</Link>
    </div>
  )
}
export default SubHeading;