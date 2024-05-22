import { useEffect, useRef, useState } from 'react';
import { AppBar } from '../components/AppBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const fetch = async()=>{
      const response = await axios.post("https://backend.rohitkumarbarada.workers.dev/api/v1/blog",{
        title:title,
        context:content
      }
       , {
        headers:{
          authorization:"Bearer "+localStorage.getItem("token")
        }

      })
      if(!response){
       return console.log("error")
      }
      else{
        const id = await response.data.response.id
        navigate(`/blog/${id}`)
      }
    }
    fetch()
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
  <>
    <AppBar/>

    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col border rounded-lg p-6 shadow-md bg-white">
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-2xl font-bold">Create Post</h1>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Publish
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <textarea
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 rounded-md focus:outline-none text-5xl font-medium h-auto min-h-[100px] max-h-[100px] resize-none"
            placeholder="Title"
          />
        </div>
        <div className="mt-4">
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="px-3 py-2 rounded-md focus:outline-none text-2xl h-auto min-h-[200px] max-h-[2000px] resize-none"
            placeholder="Write your Content..."
          />
        </div>
      </div>
    </div>

  </>);
};
