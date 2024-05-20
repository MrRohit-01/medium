import useBlog from "../hooks/useBlog";
import {BlogCard} from "../components/blogCard";

const Blog = () => {
  const { loading, blog } = useBlog(); // Destructure the returned object correctly

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <BlogCard 
        id={blog?.id ||" "}
        author={blog?.author|| "Anonymous"}
        title={blog?.title || " "}
        description={blog?.description|| " "}
      />
    </>
  );
}

export default Blog;
