import { useEffect, useState } from "react";
import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/blogCard";
import { Skeleton } from "../components/skeleton";
import { FaEllipsisV, FaTrash } from "react-icons/fa"; // Import icons

interface Post {
  id: string;
  title: string;
  context: string;
  author: { name: string };
}

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({}); // Track menu state for each post

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

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.get(`https://backend.rohitkumarbarada.workers.dev/api/v1/blog/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.msg === 'Post deleted successfully') {
        // Refresh the posts list after deletion
        fetchMyPosts();
      } else {
        console.error(response.data.msg);
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const toggleMenu = (id: string) => {
    setMenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
              <div key={post.id} className="relative">
                <BlogCard
                  id={post.id}
                  author={post.author?.name || "Anonymous"}
                  title={post.title}
                  description={post.context}
                />
                <div className="absolute top-2 right-6">
                  <div
                    onClick={() => toggleMenu(post.id)}
                    className="cursor-pointer text-gray-500"
                  >
                    <FaEllipsisV />
                  </div>
                  {menuOpen[post.id] && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-2">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center gap-2 text-red-500 text-sm"
                      >
                        <FaTrash /> <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyPosts;
