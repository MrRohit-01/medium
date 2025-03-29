import { useEffect, useState } from "react";
import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/blogCard";
import { Skeleton } from "../components/skeleton";

interface Post {
  id: string;
  title: string;
  context: string;
  author: { name: string };
}

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get<Post[]>("https://backend.rohitkumarbarada.workers.dev/api/v1/blog/me/posts", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch my posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <AppBar />
      <div className="flex justify-center mt-8">
        <div className="flex flex-col px-2 max-sm:px-4 py-3 max-w-lg justify-center w-full space-y-4">
          {posts.length === 0 ? (
            <p>You have not created any posts yet.</p>
          ) : (
            posts.map((post) => (
              <BlogCard
                id={post.id}
                key={post.id}
                author={post.author?.name || "Anonymous"}
                title={post.title}
                description={post.context}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyPosts;
