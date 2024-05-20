import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
interface BlogType {
  author: string
  title: string
  description: string
  id:string
}

const useBlog=()=>{
  const params = useParams();
  const [loading,setLoading] = useState(true)
  const [blog,setBlog] = useState<BlogType>()
  useEffect(()=>{
    const fetchData = async()=>{
      try{
      const data = await axios.get("https://backend.rohitkumarbarada.workers.dev/api/v1/blog/"+params,{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token")
        }
      })
      const response :BlogType = {
        author:data.data.responseData.author,
        title:data.data.responseData.title,
      description:data.data.responseData.context,
      id:data.data.responseData.id,
      }
      setBlog(response)
    }catch(e){
      console.log("data not fetch")
    }finally{
      setLoading(false)
    }
    
    }
    fetchData()
  },[params])
  return{
    loading,
    blog
  }
}

export default useBlog;