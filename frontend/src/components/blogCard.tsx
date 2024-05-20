import { useEffect, useState } from "react"
import { Avatar } from "./Avatar"

interface BlogType {
  author: string
  title?: string
  description: string
}
export const BlogCard = ({ author, description }: BlogType) => {
const [showDescription,setShowDescription] = useState("")
useEffect(()=>{
  setShowDescription(description.split(" ").splice(0,10).join(" "))
},[description])
  return (
    <>
      <div className="px-1  w-96">
      <div className="flex gap-2 h-full pb-3">
        <Avatar name={author} />
        <p className="mt-1">{author}</p>
        <p className="mt-1">-</p>
        <p className="mt-1">dec 3,2023</p>
      </div>
      <h1 className="text-3xl font-semibold">Title of the Content</h1>
      <h3 className="text-md mb-2">{showDescription}....</h3>
      <WordCount descriptions={description} />
      <hr/>
      </div>
    </>
  )
}
interface WordCountProps {
  descriptions: string
}
function WordCount({ descriptions }: WordCountProps) {
  const [readTime, setReadTime] = useState(0)
  useEffect(() => {
 setReadTime((descriptions.split(" ").length) / 100 );
  }, [descriptions])
  return (
    <div>
    <p className=" inline-block px-2 rounded-xl text-sm bg-gray-200">{readTime} min Read</p>
    </div>
  )
}


