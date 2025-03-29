import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/blogCard";
import { Skeleton } from "../components/skeleton";
import { Useblog } from "../hooks/useBlogs";

function Blogs() {
  const { loading, blogs } = Useblog();
  if (loading) {
    return <Skeleton />;
  }
  return (
    <>
      <AppBar />
      <div className="flex justify-center mt-8">
        <div className="flex flex-col px-2 max-sm:px-4 py-3 max-w-lg justify-center w-full space-y-4">
          {blogs && blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.id}
              author={blog.author?.name || "Anonymous"}
              title={blog.title}
              description={blog.context}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
