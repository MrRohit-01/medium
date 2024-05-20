import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/blogCard";
import { Useblog } from "../hooks/useBlog";

function Blog(){
  const { loading, blogs } = Useblog();
  if (loading) {
    return <p>loading...</p>;
  }
  if(blogs){
    console.log(blogs)
  }
  return (
    <>
      <AppBar author={"Rohit kumar barada"} />
      <div className="flex flex-col items-center">
        {blogs && blogs.map((blog) => {
          return <BlogCard
            key={blog.id}
            author={blog.author?.name || "Anonymous"}
            title={"gerg"}
            description={"Descriptions data here sgsjfhgusf rghrsg snghruignsfd grgibdf gdsfgidfbs eugerhge dfg eung eghe gegb e my self rohit kumar barada there might be anyhting to do with many data done"}
          />
        })}
      </div>
    </>
  );
}

export default Blog;
