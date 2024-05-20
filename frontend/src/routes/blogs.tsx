import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/blogCard";
import { Useblog } from "../hooks/useBlogs";

function Blogs(){
  const { loading, blogs } = Useblog();
  if (loading) {
    return <p>loading...</p>;
  }
  if(blogs){
    console.log(blogs)
  }
  return (
    <>
      <AppBar author={"Rohit"} />
      <div className="flex flex-col items-center">
        <div>
        {blogs && blogs.map((blog) => {
          return <BlogCard id={blog.id}
            key={blog.id}
            author={blog.author?.name || "Anonymous"}
            title={blog.title}
            description={blog.context}
          
          />
        })}
        </div>
      </div>
    </>
  );
}

export default Blogs;
