import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import dayjs from "dayjs";
import "./index.css";
import TextField from "@mui/material/TextField";

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const params = useParams();

  useEffect(() => {
    api
      .getPosts(params.postID)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    api
      .getComments(params.postID)
      .then((data) => setComments(data))
      .catch((err) => alert(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { new_comment },
    } = event;
    api
      .addComment(
        {
          text: new_comment.value,
        },
        params.postID
      )
      .then((data) => api.getComments(params.postID))
      .then((data) => {setComments(data);event.target.new_comment.value=''})
      .catch((err) => alert("Заполните поле комментария"));
  };

  return (
    <div className="page">
      <div className="post">
        <h1>{post?.title}</h1>
        <p className="date">
          {dayjs(post?.created_at).format("DD.MM.YYYY, HH:mm:ss")}
        </p>
        <div className="author">{post?.author.name}</div>
        <img src={post?.image} />
        <p>{post?.text}</p>
      </div>
      <div className="comments">
        {comments?.map((el) => (
          <div key={el._id}>
            <div style={{ display: "flex" }}>
              <img className="avatar" src={`${el.author.avatar}`} />
              <div>
                <div className="author">{el.author.name}</div>
                <div className="date">
                  {dayjs(el.created_at).format("DD.MM.YYYY, HH:mm:ss")}
                </div>
              </div>
            </div>
            <p> {el.text}</p>
            <hr />
          </div>
        ))}
        <div>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="new_comment"
              placeholder="Add your comment"
            />
            <button>Опубликовать</button>
          </form>
        </div>
      </div>
    </div>
  );
};
