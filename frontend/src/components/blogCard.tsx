import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BlogType {
  author: string;
  title: string;
  description: string;
  id: string;
  full?: boolean;
}

export const BlogCard = ({ author, title, description, id, full }: BlogType) => {
  const [showDescription, setShowDescription] = useState("");
  useEffect(() => {
    setShowDescription(description.split(" ").splice(0, 20).join(" "));
  }, [description]);

  return (
    <Link to={`/blog/${id}`}>
      <div className="flex gap-3 h-full pb-3">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg text-sm font-bold text-gray-700">
          {author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-700 font-medium mb-1">{author}</p>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {full ? description : `${showDescription}...`}
          </p>
          <div className="flex items-center text-xs text-gray-500 gap-2">
            <p>Dec 3, 2023</p>
            <p>26K views</p>
            <p>606 likes</p>
          </div>
        </div>
      </div>
      <hr className="mb-2" />
    </Link>
  );
};


