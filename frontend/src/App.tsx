import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "./routes/blogs";
import Signin from "./routes/signin";
import Signup from "./routes/signup";
import Blog from "./routes/blog";
import { RecoilRoot } from "recoil";
import Profile from "./routes/profile";
import Settings from "./routes/settings";
import "./App.css";
import { CreatePost } from "./routes/create";
import MyPosts from "./routes/myPosts"; // Import the new MyPosts component

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Signup />} /> {/* Changed '/signup' to '/' */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/me/posts" element={<MyPosts />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;