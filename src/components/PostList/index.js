import React, { useState } from "react";
import { Post } from "../Post";
import "./index.css";

export const PostList = ({ mapPosts, like, setLike, userInfo }) => {
  const [buttonClick, setButtonClick] = useState(1);

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
            window.scrollTo(0, 0);
          }}
        >
          {i}
        </button>
      );
    }
    return buttonList;
  };

  const pageLimit = buttonClick * 12;
  let data = null;
  buttonClick == 1
    ? (data = mapPosts.slice(0, pageLimit))
    : (data = mapPosts.slice(pageLimit - 12, pageLimit));

  return (
    <div>
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
      <div className="buttonBlock">{buttonBlock(mapPosts)}</div>
    </div>
  );
};