interface Headline {
  headline:string
}
function Heading({headline}:Headline){  
  return (
    <>
    <h1 className="text-4xl font-extrabold text-center">{headline}</h1>
    </>
  )
}
export default Heading;