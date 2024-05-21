export const Skeleton = ({size}:{size? : string})=>{

return(
<div className="px-1 py-3 max-w-xl">
      <div className="flex gap-2 h-full pb-3">
      <p className={`flex items-center justify-center  mt-0.5 cursor-pointer rounded-full bg-black text-white ${size?"w-10 h-10":"w-7 h-7"}`}></p>
        <p className="mt-1 cursor-pointer"></p>
        <p className="mt-1">-</p>
        <p className="mt-1"></p>
      </div>
      <h1 className="text-2xl font-semibold cursor-pointer  ">title</h1>
      <h3 className="text-md mb-2 cursor-pointer">Descriptions....</h3>
      <div className="pb-2"> <p className=" inline-block px-2 rounded-xl text-sm bg-gray-200">2 min Read</p></div>
      <hr/>
      </div>
      )}