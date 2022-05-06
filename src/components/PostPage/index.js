import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import dayjs from "dayjs";
import "./index.css";
import TextField from "@mui/material/TextField";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PostContext from "../Contexts/postContext";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import UserContext from "../Contexts/userContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const PostPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { posts, setPosts } = useContext(PostContext)
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { writeLS } = useLocalStorage();

  const deletePost = () => {
    api
      .deletePosts(params.postID)
      .then((res) => {
        setPosts((prevState) => {
          return prevState.filter((item) => item._id !== params.postID)
        })
        navigate('/')
      })
      .catch((err) => alert(err));
  };

  const addToFavorite = () => {
    writeLS('favorites', params.itemID);
};

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
      .then((data) => { setComments(data); event.target.new_comment.value = '' })
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
            {(userInfo._id == post?.author._id) && (<IconButton onClick={deletePost}>
              <DeleteOutlinedIcon />
            </IconButton>)}
         
          </form>
        </div>
      </div>
    </div>
  );
};
