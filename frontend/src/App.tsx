import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "./routes/blogs";
import Signin from "./routes/signin"
import Signup from "./routes/signup";
import Blog from "./routes/blog";
import {RecoilRoot} from 'recoil';


import './App.css';
import { CreatePost } from "./routes/create";
function App() {
  return (
    <BrowserRouter>
        <RecoilRoot>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/create" element={<CreatePost />} />

      </Routes>
        </RecoilRoot>
    </BrowserRouter>
  )

}
export
  default App;