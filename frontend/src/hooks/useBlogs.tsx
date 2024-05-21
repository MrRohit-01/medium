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
        const response = await axios.get("https://backend.rohitkumarbarada.workers.dev/api/v1/blog/bulk", {
          headers: {
            Authorization:"Bearer "+localStorage.getItem("token")
          }
        })
        setBlogs(response.data)
      } catch (e) {
        console.log("data didn't fetch")
        return []
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  },[blogs.length, setBlogs])
  return {
    loading,
    blogs
  }

}