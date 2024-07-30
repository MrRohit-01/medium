import { useState,useEffect } from "react"
import randomColor from "./randomColor";

export function Avatar({name,size}:{name:string,size?:string}){
  const [color,setColor] = useState<string>("black")
  useEffect(() => {
    setColor(randomColor());
  }, []);
  return(
    <p className={`flex items-center justify-center  mt-0.5 cursor-pointer rounded-full bg-[#FF70A6]  text-white ${color} ${size?"w-10 h-10":"w-7 h-7"}`}>{name.charAt(0).toUpperCase()}</p>
  )

}
