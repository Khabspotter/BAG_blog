import React, { useEffect, useState, useContext } from "react";
import { useApi } from "../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import PostContext from "../Contexts/postContext";
import "./index.css";

export const EditPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostContext);
  const api=useApi()
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleClick = () => {
    api
      .editPosts(params.postID, {
        image,
        title,
        text,
      })
      .then((data) => {
        setPosts((prevState) => {
          return [data, ...prevState.filter((el) => el._id !== data._id)];
        });
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    api.getPosts(params.postID).then((data) => {
      setImage(data.image);
      setTitle(data.title);
      setText(data.text);
    });
  }, []);

  return (
    <div className="edit">
      <div className="cardedit">
        <h1>Редактировать пост </h1>
        <h3>Заголовок поста</h3>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          name="title"
          placeholder="Заголовок"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
        <h3>Ссылка на изображение</h3>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          name="image"
          placeholder="Ссылка на картинку"
          value={image}
          onChange={({ target }) => {
            setImage(target.value);
          }}
        />
        <h3>Описание поста</h3>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          name="text"
          placeholder="Текст"
          value={text}
          onChange={({ target }) => {
            setText(target.value);
          }}
        />

        <button onClick={handleClick} className="createButton">
          Сохранить
        </button>
      </div>
    </div>
  );
};
