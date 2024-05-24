import { useEffect, useState } from "react"
import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"

interface BlogType {
  author: string
  title: string
  description: string
  id: string
  full?:boolean
}
export const BlogCard = ({ author, title, description, id,full }: BlogType) => {
  const [showDescription, setShowDescription] = useState("")
  useEffect(() => {
    setShowDescription(description.split(" ").splice(0, 10).join(" "))
  }, [description])
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="px-1 py-3 w-screen md:max-w-2xl">
          <div className="flex gap-2 h-full pb-3">
            <Avatar name={author} />
            <p className="mt-1 cursor-pointer">{author}</p>
            <p className="mt-1">-</p>
            <p className="mt-1">dec 3,2023</p>
          </div>
          <h1 className="md:text-2xl font-semibold cursor-pointer break-normal break-words">{title}</h1>
          {full || false?(<h3 className="text-md mb-2 cursor-pointer break-normal break-words">{description}....</h3>):
          (<h3 className="text-md mb-2  cursor-pointer break-normal break-words">{showDescription}</h3>)}

          <div className="pb-2"><WordCount descriptions={description} /></div>
          <hr />
        </div>
      </Link>
    </>
  )
}
interface WordCountProps {
  descriptions: string
}
function WordCount({ descriptions }: WordCountProps) {
  const [readTime, setReadTime] = useState(0)
  useEffect(() => {
    setReadTime((descriptions.length) / 100);
  }, [descriptions])
  return (
    <div>
      <p className=" inline-block px-2 rounded-xl text-sm bg-gray-200">{readTime} min Read</p>
    </div>
  )
}


