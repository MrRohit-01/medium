import { Avatar } from "./Avatar"

export const AppBar = ({author}:{author:string}) =>{
  return (
  <div className="py-1 w-full flex justify-around border">
<div className="mt-2 font-medium text-xl cursor-pointer">Medium</div>
 <Avatar size="big" name={author}/>
  </div> 
  )
}