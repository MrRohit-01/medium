interface SingleBlog {
  title: string
  description: string
  author: string
  date: string
  bio: string
}

export const SingleBlog = ({ title, description, author, date, bio }: SingleBlog) => {
  return (
    <div className="flex justify-center gap-8 flex-wrap p-8 rounded-xl">
      <div className="flex flex-col w-full md:w-7/12 lg:w-4/12">
        <h1 className="text-4xl font-extrabold cursor-pointer break-words text-gray-900 leading-tight">{title}</h1>
        <h3 className="text-sm mt-3 mb-4 text-gray-500 italic">Published on {date}</h3>
        <h3 className="text-base mb-5 text-gray-700 leading-relaxed">{description}</h3>
        <hr className="mb-5 border-gray-300" />
      </div>
      <div className="flex flex-col items-start w-full md:w-4/12 lg:w-3/12 bg-white p-4 rounded-lg">
        <div className="text-lg font-semibold text-gray-800">Author</div>
        <div className="text-xl font-medium text-gray-900 mt-2">{author}</div>
        <div className="text-sm text-gray-600 mt-3 leading-relaxed">{bio}</div>
      </div>
    </div>
  )
}