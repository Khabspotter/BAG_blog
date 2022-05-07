import React from "react";
import { useState, useEffect } from "react";
import { PostList } from "./components/PostList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Greeting } from "./components/Greeting";
import { AddPost } from "./components/AddPost";
import api from "./utils/api";
import { Routes, Route } from "react-router-dom";
import { PostPage } from "./components/PostPage";
import PostContext from "./components/Contexts/postContext";
import UserContext from "./components/Contexts/userContext";


import { Fragment } from 'react';
import ScrollButton from './components/ScrollTop/ScrollButton';


import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./components/Theme/theme";

function App() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [like, setLike] = useState(JSON.parse(localStorage.getItem("likes")));

  const [theme, setTheme] = useState("light");
  const switchTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

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
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <PostContext.Provider value={{ posts, setPosts }}>
          <UserContext.Provider value={{ userInfo, setUserInfo }}>

            <Header userInfo={userInfo} />

            <Routes>
              <Route
                path="/"
                element={<div >
                  <Greeting switchTheme={switchTheme} />
                  <Fragment>
                    <ScrollButton />
                  </Fragment>
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
          </UserContext.Provider>
        </PostContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;