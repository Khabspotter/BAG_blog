import React from "react";
import { useApi } from "../hooks/useApi";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const SignUp = ({setUserInfo}) => {
  const api = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleEmailChange = ({ target }) => {
    setEmail(target.value.toLowerCase());
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const onSignIn = (signedInUser) => {
    const { token, data } = signedInUser;
    localStorage.setItem("token", JSON.stringify(token));
    setUserInfo(data);
  };

  const signUp = () => {
    api
      .signUp({ email, password })
      .then((createdUser) => {navigate("/");
        return api.signIn({ email, password });
      })
      .then(onSignIn).catch(err=>console.log(err))
  };

  return (
    <div
    className="sign"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
        
      <div style={{ width: "400px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <TextField
            type="email"
            variant="outlined"
            placeholder="Введите e-mail"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <TextField
            type="password"
            variant="outlined"
            placeholder="Введите пароль"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px",
          }}
        >
          <button style={{ width: "45%" }} onClick={signUp}>
            Регистрация
          </button>
          <button style={{margin:'5px'}} onClick={() => navigate("/")}>
          Назад
        </button>
        </div>
      </div>
    </div>
  );
};
