import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from "react";
import Blog from "./routes/blog";
import Signin from "./routes/signin";
import Signup from "./routes/signin";
import './App.css';
function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/blog" element={<Blog/>}/>
      </Routes>
    </BrowserRouter>
  )

}
export default App;