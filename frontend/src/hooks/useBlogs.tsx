import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { blogsState } from "../store/atoms"

export interface BlogType {
  id: string,
  title: string,
  context: string,
  author: {
      name: string
}
}
export const Useblog = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useRecoilState<BlogType[]>(blogsState)
  useEffect(() => {

    const fetchData = async () => {
      if (blogs.length > 0) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return [];
        }

        const response = await axios.get("https://backend.rohitkumarbarada.workers.dev/api/v1/blog/bulk", {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is included
          },
        });

        setBlogs(response.data);
      } catch (e) {
        console.error("Failed to fetch blogs:", e);
        return [];
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  },[blogs.length, setBlogs])
  return {
    loading,
    blogs
  }

}