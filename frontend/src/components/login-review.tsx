interface reviewData{
  data:string
  name:string
  position:string
}
function LoginReview({data,name,position}:reviewData){
return (
  <div>
    <h1>{data}</h1>
    <p>{name}</p>
    <p>{position}</p>
  </div>
)
}
export default LoginReview;