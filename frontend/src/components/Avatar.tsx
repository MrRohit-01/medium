export function Avatar({name}:{name:string}){

  return(
    <p className="">
    <p className="flex items-center justify-center w-7 h-7 mt-0.5 rounded-full bg-black text-white">{name.charAt(0)}</p>
    </p>
  )
}