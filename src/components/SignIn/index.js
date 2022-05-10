import React from "react";
import { useApi } from "../hooks/useApi";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = ({ setUserInfo }) => {
  const api = useApi();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const signIn = () => {
    api.signIn({ email, password }).then(onSignIn);
  };

  return (
    <div className="sign"
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
            margin: "15px",
          }}
        >
          <button style={{ width: "45%" }} onClick={signIn}>
            Вход
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <div>Еще нет аккаунта? </div>
          <div
            style={{ color: "blue", cursor: "pointer", marginLeft: "10px" }}
            onClick={() => navigate("users/signup")}
          >
            Зарегистрироваться
          </div>
        </div>
      </div>
    </div>
  );
};
