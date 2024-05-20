export function Avatar({name,size}:{name:string,size?:string}){

  return(
  <p className={`flex items-center justify-center  mt-0.5 cursor-pointer rounded-full bg-black text-white ${size?"w-10 h-10":"w-7 h-7"}`}>{name.charAt(0)}</p>
  )
}