// src/App.jsx (Corrigido)
import React, { useState, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "./UserContext";

// Importa CSS Global
import "./App.css"; 

// Importa Componentes Reutilizáveis
import logo from "./assets/img/logo.png";

// CORREÇÃO AQUI: O caminho do PaginaHistorico foi atualizado
import PaginaHistorico from './pages/PaginaHistorico'; 

// Importa TODAS as novas páginas
import Home from "./pages/Home";
import Pag2 from "./pages/Pag2";
import Pag3 from "./pages/Pag3";
import Pag4 from "./pages/Pag4";
import Pag5 from "./pages/Pag5";
import Pag6 from "./pages/Pag6";
import Pag7 from "./pages/Pag7";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";

/* ==================== APP PRINCIPAL ==================== */
export default function App() {
  const { usuario } = useContext(UserContext);

  // O estado do carrinho fica aqui, pois é compartilhado entre Pag6 e Pag7
  const [cart, setCart] = useState([]);

  // Função do carrinho
  const adicionarAoCarrinho = (produto) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  return (
    <>
      {/* O Nav continua global */}
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

      {/* As rotas agora só apontam para os componentes importados */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pag2" element={<Pag2 />} />
        <Route path="/pag3" element={<Pag3 />} />
        <Route path="/pag4" element={<Pag4 />} />
        <Route path="/pag5" element={<Pag5 />} />
        <Route path="/produto/:id" element={<Pag6 adicionarAoCarrinho={adicionarAoCarrinho} />} />
        <Route path="/pag7" element={<Pag7 cart={cart} setCart={setCart} />} />
        <Route path="/historico" element={<PaginaHistorico />} /> 
      </Routes>
    </>
  );
}