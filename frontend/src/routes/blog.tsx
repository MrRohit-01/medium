import useBlog from "../hooks/useBlog";
import {BlogCard} from "../components/blogCard";
import { Skeleton } from "../components/skeleton";

const Blog = () => {
  const { loading, data} = useBlog(); 

  if (loading) {
    return (
      <>
      <Skeleton/>
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
      <BlogCard 
        id={data?.id ?? " "}
        author={ data?.author.name ?? "Anonymous"}
        title={data?.title ?? "No title"}
        description={data?.context ?? "No description"}
      />
    </>
  );
}

export default Blog;
