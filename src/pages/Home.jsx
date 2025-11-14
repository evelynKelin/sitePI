// src/pages/Home.jsx (Totalmente Refeito)
import React from "react";
import { useNavigate } from "react-router-dom";

// 1. Importa os novos estilos
import styles from "./Home.module.css"; 

// 2. Importa assets
import copo from "../assets/img/copo.png";
// Não precisamos mais das setas, o botão fará a navegação

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      
      {/* Coluna da Esquerda (Texto e CTA) */}
      <div className={styles.colunaTexto}>
        <h1 className="fontePrincipal">Modelo Copo</h1>
        <h2 className="fonteSecundaria">Design minimalista, fosco e elegante.</h2>
        <p className="paragrafo">
          A união perfeita de estilo e funcionalidade para quem vive 
          o "All Black Everything". Leve sua bebida com personalidade.
        </p>
        <button 
          className={styles.ctaButton} 
          onClick={() => navigate("/pag2")}
        >
          Saiba Mais
        </button>
      </div>

      {/* Coluna da Direita (Imagem) */}
      <div className={styles.colunaImagem}>
        <div className={styles.anelFundo}></div>
        <div className={styles.imagemCopo}>
          <img src={copo} alt="Copo" />
        </div>
      </div>

    </div>
  );
};

export default Home;