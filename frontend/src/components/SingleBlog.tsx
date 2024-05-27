

interface SingleBlog {
  title: string
  description: string
  author: string
  date: string
  bio: string
}
export const SingleBlog = ({ title, description, author, date, bio }: SingleBlog) => {
  return (
    <>
      <div className=" flex justify-center gap-5 flex-wrap">
        <div className="flex flex-col w-4/12 ">
          <h1 className="text-5xl font-semibold cursor-pointer">{title}</h1>
          <h3 className="text-sm mt-2 mb-2 cursor-pointer w-1/2 rounded-xl h-6">Published on {date}</h3>
          <h3 className="text-xl mb-2 mt-1 cursor-pointer rounded-xl">{description}</h3>
          <div className="pb-2">
            <p className=" inline-block px-2 rounded-xl text-sm w-2/12 h-5 "></p></div>
          <hr className="mb-3" />
  k      </div>
        <div className="">
        <div>Author</div>
        <div  className="text-2xl
        font-medium">{author}</div>
        <div className="text-md ">{bio}</div>
      </div>
      </div>
    </>
  )
}