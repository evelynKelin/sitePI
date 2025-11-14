// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import styles from "./Login.module.css"; // Estilos do Login

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.usuario);
        navigate("/perfil");
      } else {
        setErro(result.message || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.quad}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
          <button type="submit">Entrar</button>
        </form>

        {erro && <p className={styles.erro}>{erro}</p>}
        <p className={styles.trocaTela} onClick={() => navigate("/cadastro")}>
          Ainda não tem conta? Cadastre-se
        </p>
      </div>
    </div>
  );
};

export default Login;