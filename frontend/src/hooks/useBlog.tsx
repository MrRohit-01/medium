import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { blogByIdSelector } from '../store/atoms';
import axios from 'axios';

export interface BlogType {
  id: string;
  title: string;
  context: string;
  author: {
    name: string;
  };
}

const useBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const blog = useRecoilValue<BlogType | null>((id ? blogByIdSelector(id) : blogByIdSelector('')));
  const [renderData, setRenderData] = useState<BlogType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!blog) {
      
      try {
        const response = await axios.get(`https://backend.rohitkumarbarada.workers.dev/api/v1/blog/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setRenderData(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      } }
      else{
        setLoading(false);
      }
    }

    fetchData();
  }, [blog, id]);

  return {
    loading,
    data : blog || renderData
  };
};

export default useBlog;
