import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./NotFound";
import NewPost from "./NewPost";
import PostList from "./PostList";
import Home from "./Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/blog" element={<PostList/>} />
          <Route path="/newpost" element={<NewPost/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
