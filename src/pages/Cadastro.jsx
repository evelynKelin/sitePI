// src/pages/Cadastro.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import styles from "./Cadastro.module.css"; // Estilos do Cadastro (reutiliza Login.module.css)

const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "", senha: "", confirmar: "", nome: "",
    nascimento: "", telefone: "", tipo: "pf", cpf: "", cnpj: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    // Validações
    if (!form.email || !form.senha || !form.confirmar || !form.nome || !form.nascimento || !form.telefone) {
      setErro("Preencha todos os campos obrigatórios."); return;
    }
    if (form.tipo === 'pf' && !form.cpf) { setErro("Preencha o CPF."); return; }
    if (form.tipo === 'pj' && !form.cnpj) { setErro("Preencha o CNPJ."); return; }
    if (form.senha !== form.confirmar) { setErro("As senhas não coincidem."); return; }
    
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
        login(result.cliente);
        setTimeout(() => navigate("/perfil"), 1000);
      } else {
        setErro(result.message || "Erro no cadastro.");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.login}> {/* Reutiliza o fundo do login */}
      <div className={styles.quad}> {/* Reutiliza o quad */}
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          
          <div className={styles.linhaDupla}>
            <div>
              <input type="date" name="nascimento" placeholder="Data de Nascimento" value={form.nascimento} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="telefone" placeholder="Telefone (com DDD)" value={form.telefone} onChange={handleChange} />
            </div>
          </div>
          
          <div className={styles.tipoPessoa}>
            <label>
              <input type="radio" name="tipo" value="pf" checked={form.tipo === 'pf'} onChange={handleChange} />
              Pessoa Física
            </label>
            <label>
              <input type="radio" name="tipo" value="pj" checked={form.tipo === 'pj'} onChange={handleChange} />
              Pessoa Jurídica
            </label>
          </div>

          {form.tipo === 'pf' ? (
            <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
          ) : (
            <input type="text" name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} />
          )}
          
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
          <input type="password" name="confirmar" placeholder="Confirmar senha" value={form.confirmar} onChange={handleChange} />
          
          <div className={styles.botoes}>
            <button type="submit">Cadastrar</button>
          </div>
        </form>

        {erro && <p className={styles.erro}>{erro}</p>}
        {sucesso && <p className={styles.sucesso}>Cadastro realizado com sucesso!</p>}

        <p className={styles.trocaTela} onClick={() => navigate("/login")}>
          Já tem conta? Faça login
        </p>
      </div>
    </div>
  );
};

export default Cadastro;