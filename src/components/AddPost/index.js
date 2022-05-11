import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./index.css";
import PostContext from "../Contexts/postContext";
import { useApi } from "../hooks/useApi";


export const AddPost = () => {
  const { setPosts } = useContext(PostContext);
  const api=useApi()
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { image, name, description },
    } = event;
    api
      .createPost({
        title: name.value,
        image: image.value,
        text: description.value,
      })
      .then((data) => {
        setPosts((prevState) => {
          return [data, ...prevState];
        });
        navigate("/");
      })
      .catch((err) => alert("Заполните все поля"));
  };

  return (
    <div className="create">
      <div className="createcard">
        <h1>Создание поста</h1>
        <form onSubmit={handleSubmit}>
          <h3>Заголовок поста:</h3>

          <TextField
            id="outlined-basic"
            variant="outlined"
            name="name"
            placeholder="Заголовок"
          />
          <h3>Вставьте ссылку на картинку:</h3>

          <TextField
            id="outlined-basic"
            variant="outlined"
            name="image"
            placeholder="Ссылка на картинку"
          />
          <h3>Описание поста:</h3>

          <TextField
            id="outlined-basic"
            variant="outlined"
            name="description"
            placeholder="Текст"
          />
          <button className="createButton">Создать пост</button>
        </form>
      </div>
    </div>
  );
};
