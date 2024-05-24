import useBlog from "../hooks/useBlog";
import { BlogCard } from "../components/blogCard";
import { SingleBlog } from "../components/SingleBlog";
import { AppBar } from "../components/AppBar";

const LoadingSpinner = () => (
  <div className="py-1 w-full flex justify-around border">
    <div className="mt-2 font-medium text-xl cursor-pointer bg-slate-100 w-20 rounded-xl px-1"></div>
    <p className='flex items-center justify-center  mt-0.5 cursor-pointer rounded-full bg-slate-100 text-white w-10 h-10'></p>
  </div>
);

type BlogData = {
  data: {
    id: string;
    title: string;
    context: string;
    author: {
      name: string;
    };
  };
};

const BlogContent = ({ data }: BlogData) => (
  <>
    <AppBar />
    <div className="md:hidden">
      <BlogCard
        id={data?.id ?? " "}
        author={data?.author.name ?? "Anonymous"}
        title={data?.title ?? "No title"}
        description={data?.context ?? "No description"}
      />
    </div>
    <div className="max-md:hidden mt-20">
      <SingleBlog
        title={data?.title ?? "No title"}
        description={data?.context ?? "No description"}
        author={data?.author.name ?? "Anonymous"}
        date={"Dec 3,2023"}
        bio={"this is a demo page and this is demo bio"}
      />
    </div>
  </>
);

const Blog = () => {
  const { loading, data } = useBlog();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <div>Blog not found</div>;
  }

  return <BlogContent data={data} />;
};

export default Blog;
