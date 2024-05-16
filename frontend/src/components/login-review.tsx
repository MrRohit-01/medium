interface reviewData{
  data:string
  name:string
  position:string
}
function LoginReview({data,name,position}:reviewData){
return (
  <div className="">
    <h1 className="text-4xl font-bold text-wrap">"{data}"</h1>
    <p className="text-xl font-bold pt-3">{name}</p>
    <p className="text-md">{position}</p>
  </div>
)
}
export default LoginReview;