import React, { useContext } from "react";
import api from "../../utils/api";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./index.css";
import PostContext from "../Contexts/postContext";

export const AddPost = () => {

  const { setPosts} = useContext(PostContext)


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
      .then(data => {
        setPosts((prevState) => {
            return [data, ...prevState]
        })
        navigate('/')})
      .catch((err) => alert("Заполните все поля"));
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h3>Вставьте ссылку на страницу:</h3>

        <TextField
          id="outlined-basic"
          variant="outlined"
          name="image"
          placeholder="Ссылка на картинку"
        />
        <h3>Заголовок поста:</h3>

        <TextField
          id="outlined-basic"
          variant="outlined"
          name="name"
          placeholder="Заголовок"
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
  );
};