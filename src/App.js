import React from "react";
import { useState, useEffect } from "react";
import { PostList } from "./components/PostList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Greeting } from "./components/Greeting";
import { AddPost } from "./components/AddPost";
import api from "./utils/api";
import { Routes, Route, Link } from "react-router-dom";
import { PostPage } from "./components/PostPage";

function App() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [like, setLike] = useState(JSON.parse(localStorage.getItem("likes")));

  useEffect(() => {
    api.getPosts().then((result) => {
      setPosts(result.reverse());
    });
  }, []);

  useEffect(() => {
    api.getUserInfo().then((result) => {
      setUserInfo(result);
    });
  }, []);

  return (
    <div>
      <Header userInfo={userInfo} />
      
      <Routes>
        <Route
          path="/"
          element={<div>
            <Greeting />;
            <PostList
              mapPosts={posts}
              like={like}
              setLike={setLike}
              userInfo={userInfo}
            />
            </div>
          }
        />
        <Route path="create" element={<AddPost />} />
        <Route path="posts/:postID" element={<PostPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
