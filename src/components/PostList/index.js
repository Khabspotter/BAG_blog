import React, { useState } from "react";
import { Post } from "../Post";
import "./index.css";
import { useContext } from "react";
import PostContext from "../Contexts/postContext";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export const PostList = ({ mapPosts, like, setLike, userInfo, getPost }) => {
  const [buttonClick, setButtonClick] = useState(1);
  const { setPosts } = useContext(PostContext);
  const navigate = useNavigate();

  const buttonBlock = () => {
    const buttonList = [];
    const buttonNum = Math.ceil(mapPosts.length / 12);
    for (let i = 1; i <= buttonNum; i++) {
      buttonList.push(
        <button
          className="numButton"
          key={i}
          onClick={() => {
            setButtonClick(i);
            window.scrollTo({
              top: 0,

              behavior: "smooth",
            });

          }}
        >
          {i}
        </button>
      );
    }
    return buttonList;
  };

  const mostLiked = () => {
    setPosts(
      mapPosts.sort(function (a, b) {
        return b.likes.length - a.likes.length;
      })
    );
    navigate("/");
  };
  const mostComment = () => {
    setPosts(
      mapPosts.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      })
    );
    navigate("/");
  };
  const newAdded = () => {
    getPost();
  };
  const oldAdded = () => {
    api
      .getPosts()
      .then((result) => {
        setPosts(result);
      })
      .catch((err) => alert(err));
  };

  function selectChanged(value) {
    switch (value) {
      case 1:
        mostLiked();
        break;
      case 2:
        mostComment();
        break;
      case 3:
        newAdded();
        break;
      case 4:
        oldAdded();
        break;
    }
  }

  const pageLimit = buttonClick * 12;
  let data = null;
  buttonClick == 1
    ? (data = mapPosts.slice(0, pageLimit))
    : (data = mapPosts.slice(pageLimit - 12, pageLimit));

  return (
    <div>

      <div className="postContainer">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="select">
            <select defaultValue='default'
              onChange={(event) => {
                selectChanged(Number(event.target.value));
              }}
            >
              <option value='default' disabled selected style={{ display: "none" }}>
                Сортировать:
              </option>
              <option value={1}>Наиболее популярные</option>
              <option value={2}>Самые комментируемые</option>
              <option value={3}>Сначала новые</option>
              <option value={4}>Сначала старые</option>
            </select>
          </div>
          <div className="postlist">
            {data.map((item) => (
              <Post
                key={item._id}
                postsKey={item}
                userInfo={userInfo}
                setLike={setLike}
                isLiked={like?.includes(item._id)}
              />
            ))}
          </div>
          <div>
            <div className="buttonBlock">{buttonBlock(mapPosts)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
