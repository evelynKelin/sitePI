// src/UserContext.jsx
import React, { createContext, useState } from 'react';

// 1. Criar o Contexto
export const UserContext = createContext(null);

// 2. Criar o Provedor (Componente que vai gerenciar os dados)

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // Estado global do usuário


  // Função para fazer login
  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
  };

// Função para fazer logout
  const logout = () => {
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};