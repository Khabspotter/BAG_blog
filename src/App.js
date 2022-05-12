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
import { Fragment } from "react";
import ScrollButton from "./components/ScrollTop/ScrollButton";
import { EditUser } from "./components/EditUser";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./components/Theme/theme";
import { UserInfo } from "./components/UserInfo/UserInfo";
import { EditPost } from "./components/EditPost";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { useApi } from "./components/hooks/useApi";
import { useLocalStorage } from "./components/hooks/useLocalStorage";

function App() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [like, setLike] = useState(JSON.parse(localStorage.getItem("likes")));
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("light");
  const [isLoaded, setIsLoaded] = useState(false);
  const api = useApi();
  const { readLS } = useLocalStorage();
  const switchTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const token = readLS("token");

  const handleChange = (value) => {
    setQuery(value)
  }

  const getPost = () => {
    api
      .getPosts()
      .then((result) => {
        setIsLoaded(true);
        setPosts(result.reverse());
      })
      .catch((err) => {
        setIsLoaded(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, [userInfo]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        setUserInfo(result);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getSearch(query)
      .then((result) => {
        setPosts(result.reverse());
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <PostContext.Provider value={{ posts, setPosts }}>
          <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <Header
              userInfo={userInfo}
              switchTheme={switchTheme}
              theme={theme}
              token={token}
              setUserInfo={setUserInfo}
              handleChange={handleChange}
            />

            <Routes>
              {token ? (
                <Route
                  path="/"
                  element={
                    <div>
                      <Greeting switchTheme={switchTheme} />
                      <Fragment>
                        <ScrollButton />
                      </Fragment>
                      <PostList
                        like={like}
                        setLike={setLike}
                        isLoaded={isLoaded}
                        userInfo={userInfo}
                        getPost={getPost}
                      />
                    </div>
                  }
                />
              ) : (
                <Route
                  path="/"
                  element={<SignIn setUserInfo={setUserInfo} />}
                />
              )}
              <Route path="create" element={<AddPost />} />
              <Route path="posts/:postID" element={<PostPage />} />
              <Route path="posts/:postID/edit" element={<EditPost />} />
              <Route
                path="user/edit"
                element={
                  <EditUser userInfo={userInfo} setUserInfo={setUserInfo} />
                }
              />
              <Route path="posts/:postID/info" element={<UserInfo />} />
              <Route path="users/:userID" element={<UserInfo />} />

              <Route
                path="users/signup"
                element={<SignUp setUserInfo={setUserInfo} />}
              />
            </Routes>
            <Footer />
          </UserContext.Provider>
        </PostContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
