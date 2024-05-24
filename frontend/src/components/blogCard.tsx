import { useEffect, useState } from "react"
import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"

interface BlogType {
  author: string
  title: string
  description: string
  id: string
}
export const BlogCard = ({ author, title, description, id }: BlogType) => {
  const [showDescription, setShowDescription] = useState("")
  useEffect(() => {
    setShowDescription(description.split(" ").splice(0, 10).join(" "))
  }, [description])
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="px-1 py-3 max-w-xl">
          <div className="flex gap-2 h-full pb-3">
            <Avatar name={author} />
            <p className="mt-1 cursor-pointer">{author}</p>
            <p className="mt-1">-</p>
            <p className="mt-1">dec 3,2023</p>
          </div>
          <h1 className="text-2xl font-semibold cursor-pointer break-normal break-words">{title}</h1>
          <h3 className="text-md mb-2 cursor-pointer break-normal break-words">{showDescription}....</h3>
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
    setReadTime((descriptions.split(" ").length) / 100);
  }, [descriptions])
  return (
    <div>
      <p className=" inline-block px-2 rounded-xl text-sm bg-gray-200">{readTime} min Read</p>
    </div>
  )
}


