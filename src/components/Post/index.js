import React, { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import { useApi } from "../hooks/useApi";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import PostContext from "../Contexts/postContext";
import './index.css'

export const Post = ({ postsKey, isLiked, setLike, userInfo }) => {
  const { posts, setPosts } = useContext(PostContext);
  const params = useParams();
  const api = useApi();
  const [liked, setLiked] = useState(postsKey.likes.length);
  useEffect(() => {
    setLiked(postsKey.likes.length);
  }, [postsKey.likes.length]);
  const navigate = useNavigate();

  const addLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key)) || [];
    storage.push(value);
    localStorage.setItem(key, JSON.stringify(storage));
  };

  const removeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key));
    const filteredStorage = storage.filter((itemID) => value !== itemID);
    localStorage.setItem(key, JSON.stringify(filteredStorage));
  };

  const getLike = () => {
    addLS("likes", postsKey._id);
    setLike((prevState) => [...prevState, postsKey._id]);
    api
      .addLike(postsKey._id)
      .then((addedItem) => {
        setLiked(addedItem.likes.length);
      })
      .catch((err) => alert("Ошибка"));
  };

  const removeLike = () => {
    removeLS("likes", postsKey._id);
    setLike((prevState) =>
      prevState.filter((itemID) => postsKey._id !== itemID)
    );
    api
      .deleteLike(postsKey._id)
      .then((removedItem) => {
        setLiked(removedItem.likes.length);
      })
      .catch((err) => alert(`${err.message}`));
  };

  const deletePost = () => {
    api
      .deletePosts(postsKey._id)
      .then((res) => {
        setPosts((prevState) => {
          return prevState.filter((item) => item._id !== postsKey._id);
        });
      })
      .catch((err) => alert(err));
  };
  return (
    <Card className="card" sx={{ minWidth: 275 }}>
      <CardContent>
        <div
          onClick={() => navigate(`posts/${postsKey._id}`)}
          style={{ cursor: "pointer" }}
        >
          <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            {postsKey.title}
          </Typography>
        </div>
        <hr />
        <Typography variant="h9" component="div" color="text.secondary">
          <Link
            style={{
              textDecoration: "none",
              color: "grey",
              fontFamily: "Geneva, Arial, Helvetica, sans-serif",
              fontSize: "13px",
            }}
            to={`users/${postsKey.author._id}`}
          >
            {" "}
            👤 {postsKey.author.name}{" "}
          </Link>
        </Typography>
        <br />
        <CardMedia
          component="img"
          height="auto"
          image={postsKey.image}
          alt="Изображение"
        />
        <br />
        <div style={{ maxHeight: "60px", overflow: "hidden" }}>
          <Typography variant="body2">{postsKey.text}</Typography>
        </div>
        <br />
        <Typography variant="h8" color="text.secondary">
          {dayjs(postsKey.created_at).format("DD.MM.YYYY, HH:mm:ss")}
        </Typography>
        <br />
        <Typography variant="h7" color="text.secondary">
          Last edit {dayjs(postsKey.updated_at).format("DD.MM.YYYY, HH:mm:ss")}
        </Typography>
        <br />
        <div className="like">
          {isLiked ? (
            <IconButton onClick={removeLike}>
              <FavoriteIcon fontSize="small" />
              <p style={{ fontSize: "small" }}>{liked}</p>
            </IconButton>
          ) : (
            <IconButton onClick={getLike}>
              <FavoriteBorderIcon fontSize="small" />
              {liked > 0 && <p style={{ fontSize: "small" }}>{liked}</p>}
            </IconButton>
          )}
          {postsKey.comments.length > 0 && (
            <IconButton onClick={() => navigate(`posts/${postsKey._id}`)}>
              <ForumOutlinedIcon fontSize="small" />
              <p style={{ fontSize: "small" }}>{postsKey.comments.length}</p>
            </IconButton>
          )}
          {userInfo._id == postsKey.author._id && (
            <IconButton onClick={deletePost}>
              <DeleteOutlinedIcon />
            </IconButton>
          )}
          </div>
      </CardContent>
    </Card>
  );
};