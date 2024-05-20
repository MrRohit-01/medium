import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from "react";
import Blogs from "./routes/blogs";
import Signin from "./routes/signin" 
import Signup from "./routes/signup";
import Blog from "./routes/blog";
import './App.css';
function App(){
  return(
    <BrowserRouter>
    <Routes>
    
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      </Routes>
    </BrowserRouter>
  )

}
export default App;