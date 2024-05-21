import useBlog from "../hooks/useBlog";
import {BlogCard} from "../components/blogCard";
import { SingleBlog } from "../components/SingleBlog";

const Blog = () => {
  const { loading, data} = useBlog(); 

  if (loading) {
    return (
      <>
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
     <div className="md:hidden"> <BlogCard 
        id={data?.id ?? " "}
        author={ data?.author.name ?? "Anonymous"}
        title={data?.title ?? "No title"}
        description={data?.context ?? "No description"}
        /></div>
        <div className="max-md:hidden"><SingleBlog title={data?.title ?? "No title"} description={data?.context ?? "No description"} author={ data?.author.name ?? "Anonymous"} date={"Dec 3,2023"} bio={"this is a demo page and this is demo bio"} /></div>
    </>
  );
}

export default Blog;
