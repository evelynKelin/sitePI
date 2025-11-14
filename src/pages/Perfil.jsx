// src/pages/Perfil.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import SeletorEstrelas from "../SeletorEstrelas";
import { produtos } from "../data/products"; // Importa os produtos
// Reutiliza os estilos de Login/Cadastro
import styles from "./Cadastro.module.css"; 

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);

  const [formAvaliacao, setFormAvaliacao] = useState({
    produtoId: '2', nota: 0, comentario: ''
  });
  const [erroAvaliacao, setErroAvaliacao] = useState('');
  const [sucessoAvaliacao, setSucessoAvaliacao] = useState('');

  const handleFormChange = (e) => {
    setFormAvaliacao({ ...formAvaliacao, [e.target.name]: e.target.value });
  };
  const handleNotaChange = (novaNota) => {
    setFormAvaliacao({ ...formAvaliacao, nota: novaNota });
  };

  const handleSubmitAvaliacao = async (e) => {
    e.preventDefault();
    setErroAvaliacao(''); setSucessoAvaliacao('');

    if (formAvaliacao.nota === 0) {
      setErroAvaliacao('Por favor, selecione uma nota (de 1 a 5 estrelas).');
      return;
    }
    const produtoAvaliado = produtos.find(p => p.id === parseInt(formAvaliacao.produtoId));
    try {
      const dadosAvaliacao = {
        ...formAvaliacao,
        clienteId: usuario.id,
        produtoNome: produtoAvaliado.nome,
      };
      const response = await fetch("http://localhost:3001/api/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAvaliacao),
      });
      if (!response.ok) throw new Error('Falha ao enviar avaliação.');
      setSucessoAvaliacao('Avaliação enviada com sucesso!');
      setFormAvaliacao({ ...formAvaliacao, nota: 0, comentario: '' });
    } catch (err) {
      setErroAvaliacao(err.message);
    }
  };

  return (
    <div className={styles.login}> {/* Fundo do login */}
      <div className={styles.quad} style={{ width: '600px', textAlign: 'left' }}>
        <h2>Perfil de {usuario ? usuario.nome.split(' ')[0] : "Usuário"}</h2>
        <p><strong>Nome:</strong> {usuario ? usuario.nome : "N/A"}</p>
        <p><strong>Email:</strong> {usuario ? usuario.email : "N/A"}</p>

        <div className={styles.botoes}>
          <button onClick={() => navigate("/")} style={{width: '48%', backgroundColor: '#fff', color: '#000'}}>
            Voltar
          </button>
          {usuario && <button onClick={logout} style={{width: '48%'}}>Sair</button>}
        </div>

        <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #555' }} />
        <h3>Deixar uma Avaliação</h3>
        <form onSubmit={handleSubmitAvaliacao}>
          <label>Produto:</label>
          <select 
            name="produtoId" 
            value={formAvaliacao.produtoId} 
            onChange={handleFormChange}
            className={styles.selectAvaliacao} // Estilo customizado
          >
            {produtos.map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>

          <label>Nota:</label>
          <SeletorEstrelas nota={formAvaliacao.nota} onChange={handleNotaChange} />

          <label>Comentário (opcional):</label>
          <textarea
            name="comentario"
            value={formAvaliacao.comentario}
            onChange={handleFormChange}
            placeholder="Escreva sua avaliação aqui..."
            className={styles.textareaAvaliacao} // Estilo customizado
          />

          <button type="submit" style={{ width: '100%', marginTop: '20px' }}>Enviar Avaliação</button>
          {erroAvaliacao && <p className={styles.erro}>{erroAvaliacao}</p>}
          {sucessoAvaliacao && <p className={styles.sucesso}>{sucessoAvaliacao}</p>}
        </form>
      </div>
    </div>
  );
};

export default Perfil;