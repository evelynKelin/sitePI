<<<<<<< HEAD
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import copo from "./assets/img/copo.png";
import logo from "./assets/img/logo.png";

import "./App.css";

import Verificado from "./Verificado";
import Check from "./Check";
import Seta from "./Seta";
import Estrela from "./Estrela";

// Página 2
const Pag2 = () => {
  const navigate = useNavigate();
  const handleClick = () => {};

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
              <li>
                <Verificado onClick={handleClick} />
                <h2>Aço inoxidável fosco</h2>
              </li>
              <li>
                <Verificado onClick={handleClick} />
                <h2>Capacidade de 500 ml</h2>
              </li>
              <li>
                <Verificado onClick={handleClick} />
                <h2>Ecológico e reutilizável</h2>
              </li>
              <li>
                <Verificado onClick={handleClick} />
                <h2>Design minimalista</h2>
              </li>
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
  const handleCheck = () => {};

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
            <li>
              <Check onClick={handleCheck} />
              <h2>Manter a bebida gelada ou quente</h2>
            </li>
            <li>
              <Check onClick={handleCheck} />
              <h2>Combina com qualquer ambiente</h2>
            </li>
            <li>
              <Check onClick={handleCheck} />
              <h2>Fácil de lavar</h2>
            </li>
            <li>
              <Check onClick={handleCheck} />
              <h2>Ideal para quem curte estilo “All Black”</h2>
            </li>
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

      <div id="containers">
        <div id="c1">
          <div id="Estrelas">
            <Estrela /> <Estrela /> <Estrela /> <Estrela /> <Estrela />
          </div>
          <p>“O atendimento foi excelente e a entrega super rápida. Recomendo demais a loja e seus produtos!”</p>
          <p>-Carla A.</p>
        </div>
      </div>

      <div id="containers">
        <div id="c2">
          <div id="Estrelas">
            <Estrela /> <Estrela /> <Estrela /> <Estrela /> <Estrela />
          </div>
          <p>“Atendimento excelente, recomendo muito!”</p>
          <p>-Bruno T.</p>
        </div>
      </div>

      <div id="containers">
        <div id="c3">
          <div id="Estrelas">
            <Estrela /> <Estrela /> <Estrela /> <Estrela /> <Estrela />
          </div>
          <p>“Já comprei mais de um produto na loja e todos chegaram super bem embalados. A qualidade é impecável!”</p>
          <p>-Lucas M.</p>
        </div>
      </div>

      <div id="containers">
        <div id="c4">
          <div id="Estrelas">
            <Estrela /> <Estrela /> <Estrela /> <Estrela /> <Estrela />
          </div>
          <p>“Design moderno, combina com tudo.”</p>
          <p>-João</p>
        </div>
      </div>

      <Seta direcao="arrow_back" onClick={() => navigate("/pag3")} className="seta-esquerda" />
      <Seta direcao="arrow_forward" onClick={() => navigate("/")} className="seta-direita" />
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

  return (
    <div id="login">
      <div id="quad">
        <form>
          <h2>Login</h2>

          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="email" />

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="senha" />

          <button type="submit">Avançar</button>
          <button type="button" onClick={() => navigate("/cadastro")}>
            Criar conta
          </button>

          <button type="button">Recuperar Senha</button>
        </form>
      </div>
    </div>
  );
};

// Página Cadastro
const Cadastro = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (!form.email || !form.senha || !form.confirmar || !form.nome || !form.nascimento || !form.telefone || !form.tipo) {
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

    if (form.tipo === "fisica" && !form.cpf) {
      setErro("Digite o CPF.");
      return;
    }
    if (form.tipo === "juridica" && !form.cnpj) {
      setErro("Digite o CNPJ.");
      return;
    }

    navigate("/perfil");

    setSucesso(true);
    setForm({
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
  };

  return (
    <div id="login">
      <div id="quad">
        <form onSubmit={handleSubmit}>
          <h2>Cadastro</h2>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="senha" value={form.senha} onChange={handleChange} />

          <label htmlFor="confirmar">Confirmar senha</label>
          <input type="password" id="confirmar" name="confirmar" value={form.confirmar} onChange={handleChange} />

          <label htmlFor="nome">Nome completo</label>
          <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} />

          <div className="linha-dupla">
            <div>
              <label htmlFor="nascimento">Data de nascimento</label>
              <input type="date" id="nascimento" name="nascimento" value={form.nascimento} onChange={handleChange} />
            </div>

            {form.tipo === "fisica" && (
              <div>
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" />
              </div>
            )}

            {form.tipo === "juridica" && (
              <div>
                <label htmlFor="cnpj">CNPJ</label>
                <input type="text" id="cnpj" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
              </div>
            )}
          </div>

          <div className="tipo-pessoa">
            <label>
              <input type="radio" name="tipo" value="fisica" checked={form.tipo === "fisica"} onChange={handleChange} /> Pessoa física
            </label>
            <label>
              <input type="radio" name="tipo" value="juridica" checked={form.tipo === "juridica"} onChange={handleChange} /> Pessoa jurídica
            </label>
          </div>

          <label htmlFor="telefone">Telefone</label>
          <input type="text" id="telefone" name="telefone" value={form.telefone} onChange={handleChange} />

          <div className="botoes">
            <button type="submit" className="criar">Criar conta</button>
            <button type="button" onClick={() => navigate("/login")}>Voltar</button>
          </div>

          {erro && <p className="erro">{erro}</p>}
          {sucesso && <p className="sucesso">Cadastro realizado com sucesso!</p>}
        </form>
      </div>
    </div>
  );
};

// Página Perfil
const Perfil = () => {
  const navigate = useNavigate();

  return (
    <div id="login">
      <div id="quad">
        <div className="perfil-foto">
          <img src="https://via.placeholder.com/80" alt="Foto de perfil" />
        </div>

        <input type="text" value="usuario@exemplo.com" readOnly />
        <input type="password" value="*******" readOnly />
        <input type="text" placeholder="Nome" />

        <div className="linha-dupla">
          <input type="text" value="15/09/2002" readOnly />
          <input type="text" value="123.456.789-10" readOnly />
        </div>

        <input type="text" value="(54)98756-4562" readOnly />

        <div className="botoes">
          <button className="salvar">Salvar</button>
          <button className="cancelar" onClick={() => navigate("/")}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// App principal
export default function App() {
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
            <Link to="/login" className="btn-login">Login</Link>
=======
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './login'; // importa a página de login

function App() {
  return (
    <div>
      {/* Menu */}
      <nav className="menuzinho">
        <ul>
          <li><Link to="/">logo loja</Link></li>
          <li><Link to="/">NomeLoja</Link></li>
          <li id="mDiferente">
            <Link to="/login"><button>Login</button></Link>
>>>>>>> 7b34aefe12918dbaf8592671d0aa6c38b9b68edb
          </li>
        </ul>
      </nav>

<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pag2" element={<Pag2 />} />
        <Route path="/pag3" element={<Pag3 />} />
        <Route path="/pag4" element={<Pag4 />} />
      </Routes>
    </>
  );
}
=======
      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Bem-vindo à Home!</h1>
    </div>
  );
}

export default App;
>>>>>>> 7b34aefe12918dbaf8592671d0aa6c38b9b68edb
