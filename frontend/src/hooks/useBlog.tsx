import axios from "axios"
import { useEffect, useState } from "react"

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
  const [blogs, setBlogs] = useState<BlogType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend.rohitkumarbarada.workers.dev/api/v1/blog/bulk", {
          headers: {
            Authorization:"Bearer "+localStorage.getItem("token")
          }
        })
        setBlogs(response.data)
      } catch (e) {
        console.log("data didn't fetch")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  },[])
  return {
    loading,
    blogs
  }

}