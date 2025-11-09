// src/App.jsx
import React, { useState, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import copo from "./assets/img/copo.png";
import logo from "./assets/img/logo.png";
import adicionar from "./assets/img/adicionar.png";

import "./App.css";

import Verificado from "./Verificado";
import Check from "./Check";
import Seta from "./Seta";
import Estrela from "./Estrela";
import { UserContext } from "./UserContext";

/* ==================== PÁGINAS ==================== */

// Página 2
const Pag2 = () => {
  const navigate = useNavigate();

  return (
    <div id="vertical">
      <div id="pai2">
        <div id="pag2">
          <div id="f1p2">
            <h1 className="fontePrincipal">O que é esse copo?</h1>
          </div>

          <div id="copop2">
            <img src={copo} alt="Copo" />
          </div>

          <div className="anelp2"></div>

          <div id="listap2">
            <ul>
              <li><Verificado /> <h2>Aço inoxidável fosco</h2></li>
              <li><Verificado /> <h2>Capacidade de 500 ml</h2></li>
              <li><Verificado /> <h2>Ecológico e reutilizável</h2></li>
              <li><Verificado /> <h2>Design minimalista</h2></li>
            </ul>
          </div>

          <Seta direcao="arrow_back" onClick={() => navigate("/")} className="seta-esquerda" />
          <Seta direcao="arrow_forward" onClick={() => navigate("/pag3")} className="seta-direita" />
        </div>
      </div>
    </div>
  );
};

// Página 3
const Pag3 = () => {
  const navigate = useNavigate();

  return (
    <div id="horizontal">
      <div id="pag3">
        <div id="titulop3">
          <h1 className="fontePrincipal">POR QUE USAR?</h1>
        </div>

        <div id="copop3">
          <img src={copo} alt="Copo" />
        </div>

        <div className="anelp3"></div>

        <div id="listap3">
          <ul>
            <li><Check /> <h2>Manter a bebida gelada ou quente</h2></li>
            <li><Check /> <h2>Combina com qualquer ambiente</h2></li>
            <li><Check /> <h2>Fácil de lavar</h2></li>
            <li><Check /> <h2>Ideal para quem curte estilo “All Black”</h2></li>
          </ul>
        </div>

        <Seta direcao="arrow_back" onClick={() => navigate("/pag2")} className="seta-esquerda" />
        <Seta direcao="arrow_forward" onClick={() => navigate("/pag4")} className="seta-direita" />
      </div>
    </div>
  );
};

// Página 4
const Pag4 = () => {
  const navigate = useNavigate();

  return (
    <div id="horizontal">
      <div id="titulop4">
        <h1 className="fontePrincipal">Avaliações</h1>
      </div>

      <div id="copop4">
        <img src={copo} alt="Copo" />
      </div>

      <div className="anelp4"></div>

      {[1, 2, 3, 4].map((num) => (
        <div id={`containers${num}`} key={num}>
          <div id={`c${num}`}>
            <div id="Estrelas">
              <Estrela /> <Estrela /> <Estrela /> <Estrela /> <Estrela />
            </div>
            <p>“Comentário de exemplo {num}.”</p>
            <p>-Usuário {num}</p>
          </div>
        </div>
      ))}

      <Seta direcao="arrow_back" onClick={() => navigate("/pag3")} className="seta-esquerda" />
      <Seta direcao="arrow_forward" onClick={() => navigate("/pag5")} className="seta-direita" />
    </div>
  );
};

//Página 5 - Produtos

const Pag5 = () => {
  const navigate = useNavigate();

  return (
    <div id="">

      <div id="produto">
         <img src={adicionar} alt="adicionar" />
      </div>
    </div>
     );
};

// Página Home
const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="vertical">
      <div id="pai">
        <div id="filho1">
          <h1 className="fontePrincipal">Modelo Copo</h1>
        </div>

        <div id="filho2">
          <img src={copo} alt="Copo" />
        </div>

        <div className="anelFundo"></div>

        <div id="filho3">
          <h2 className="fonteSecundaria">Algumas informações sobre o copo</h2>
          <p className="paragrafo">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...</p>
        </div>

        <div id="filho4">
          <div className="fundinho2">
            <h2 className="fonteSecundaria">O design</h2>
            <p className="paragrafo">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...</p>
          </div>
        </div>

        <Seta direcao="arrow_forward" onClick={() => navigate("/pag2")} className="seta-direita" />
      </div>
    </div>
  );
};

// Página Login
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
    <div id="login">
      <div id="quad">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
          <button type="submit">Entrar</button>
        </form>

        {erro && <p className="erro">{erro}</p>}
        <p className="trocaTela" onClick={() => navigate("/cadastro")}>
          Ainda não tem conta? Cadastre-se
        </p>
      </div>
    </div>
  );
};

// Página Cadastro
const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    senha: "",
    confirmar: "",
    nome: "",
    nascimento: "",
    telefone: "",
    tipo: "",
    cpf: "",
    cnpj: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (!form.email || !form.senha || !form.confirmar || !form.nome) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.senha !== form.confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    const { confirmar, ...dataToSend } = form;

    try {
      const response = await fetch("http://localhost:3001/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setSucesso(true);
        setErro("");
        login(result.cliente);
        setTimeout(() => navigate("/perfil"), 1000);
      } else {
        setErro(result.message || "Erro no cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  };

  return (
    <div id="login">
      <div id="quad">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
          <input type="password" name="confirmar" placeholder="Confirmar senha" value={form.confirmar} onChange={handleChange} />
          <button type="submit">Cadastrar</button>
        </form>

        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">Cadastro realizado com sucesso!</p>}

        <p className="trocaTela" onClick={() => navigate("/login")}>
          Já tem conta? Faça login
        </p>
      </div>
    </div>
  );
};

// Página Perfil
const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);

  return (
    <div id="login">
      <div id="quad">
        <h2>Perfil do Usuário</h2>
        <p>{usuario ? usuario.nome : "Usuário Anônimo"}</p>
        <button className="cancelar" onClick={() => navigate("/")}>
          Voltar
        </button>
        {usuario && <button onClick={logout}>Sair</button>}
      </div>
    </div>
  );
};

/* ==================== APP PRINCIPAL ==================== */
export default function App() {
  const { usuario } = useContext(UserContext);

  return (
    <>
      <nav className="menuzinho">
        <ul>
          <li>
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </li>
          <li>
            {usuario ? (
              <Link to="/perfil" className="btn-login">
                Ver Perfil ({usuario.nome.split(" ")[0]})
              </Link>
            ) : (
              <Link to="/login" className="btn-login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pag2" element={<Pag2 />} />
        <Route path="/pag3" element={<Pag3 />} />
        <Route path="/pag4" element={<Pag4 />} />
         <Route path="/pag5" element={<Pag5 />} />
      </Routes>
    </>
  );
}
