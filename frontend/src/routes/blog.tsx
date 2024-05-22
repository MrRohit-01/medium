import useBlog from "../hooks/useBlog";
import { BlogCard } from "../components/blogCard";
import { SingleBlog } from "../components/SingleBlog";
import { AppBar } from "../components/AppBar";

const Blog = () => {
  const { loading, data } = useBlog();

  if (loading) {
    return (
      <>
       <div className="py-1 w-full flex justify-around border">
        <div className="mt-2 font-medium text-xl cursor-pointer bg-slate-100 w-20 rounded-xl px-1"></div>
        <p className='flex items-center justify-center  mt-0.5 cursor-pointer rounded-full bg-slate-100 text-white w-10 h-10'></p>
      </div>
      <div className="max-md:hidden mt-20">
        <div className=" flex justify-center gap-5 flex-wrap">
          <div className="flex flex-col w-4/12 ">
            <h1 className="text-5xl font-semibold cursor-pointer bg-slate-100 rounded-3xl h-12 w-10/12"></h1>
            <h3 className="text-sm mt-2 mb-2 cursor-pointer w-3/12 rounded-xl h-5 bg-slate-100"></h3>
            <h3 className="text-2xl mb-2 mt-1 cursor-pointer w-2/3 rounded-xl h-7 bg-slate-100"></h3>
            <div className="pb-2">
              <p className=" inline-block px-2 rounded-xl text-sm w-2/12 h-5 "></p></div>
            <hr className="mb-3" />
          </div>
          <div className="w-2/12">
            <div className="h-5 bg-slate-100 w-6/12 rounded-lg"></div>
            <div className="text-2xl w-11/12 rounded-2xl bg-slate-100 mt-2 h-8
        font-medium"></div>
            <div className="text-md w-full bg-slate-100 h-6 mt-3 rounded-xl"></div>
            <div className="text-md w-full bg-slate-100 h-6 mt-3 rounded-xl"></div>
          </div>
        </div>
      </div>
      </>
    );
  }
  if (!data) {

    return (
      <div>

        Blog not found
      </div>
    );
  }

  return (
    <>
       <AppBar/>
     <div className="md:hidden">
       <BlogCard 
        id={data?.id ?? " "}
        author={ data?.author.name ?? "Anonymous"}
        title={data?.title ?? "No title"}
        description={data?.context ?? "No description"}
        /></div>
        <div className="max-md:hidden mt-20">
        <SingleBlog title={data?.title ?? "No title"} description={data?.context ?? "No description"} author={ data?.author.name ?? "Anonymous"} date={"Dec 3,2023"} bio={"this is a demo page and this is demo bio"} /></div>
      
    </>
  );
}

export default Blog;
