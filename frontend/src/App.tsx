import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Blogs from "./routes/blogs";
import Signin from "./routes/signin"
import Signup from "./routes/signup";
import Blog from "./routes/blog";
import {RecoilRoot} from 'recoil';
import './App.css';
function App() {
  return (

    <BrowserRouter>
        <RecoilRoot>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />

      </Routes>
        </RecoilRoot>
    </BrowserRouter>
  )

}
export
  default App;