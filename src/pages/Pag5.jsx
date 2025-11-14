// src/pages/Pag5.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pag5.module.css"; // Estilos da Pag5

// Importa os dados do novo arquivo
import { produtos } from "../data/products"; 
import Seta from "../Seta";

const Pag5 = () => {
  const navigate = useNavigate();
  // Remove as definições de 'produtos' e 'precos' daqui
  const linha1 = produtos.slice(0, 4);
  const linha2 = produtos.slice(4, 8);

  return (
    <div className={styles.produtosContainer}>
      <div className={styles.linha}>
        {linha1.map((produto) => (
          <div key={produto.id} className={styles.prod}>
            <img src={produto.img} alt={produto.nome} className={styles.fotoProduto} />
            <img
              src={produto.imagem}
              alt="Adicionar"
              className={styles.cruz}
              onClick={() => navigate(`/produto/${produto.id}`)}
            />
          </div>
        ))}
      </div>

      <div className={styles.linha}>
        {linha2.map((produto) => (
          <div key={produto.id} className={styles.prod}>
            <img src={produto.img} alt={produto.nome} className={styles.fotoProduto} />
            <img
              src={produto.imagem}
              alt="Adicionar"
              className={styles.cruz}
              onClick={() => navigate(`/produto/${produto.id}`)}
            />
          </div>
        ))}
      </div>

      <Seta direcao="arrow_back" onClick={() => navigate("/")} className="seta-esquerda" />
    </div>
  );
};

export default Pag5;