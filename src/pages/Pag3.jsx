// src/pages/Pag3.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pag3.module.css"; // Estilos da Pag3

// Componentes e Assets
import copo from "../assets/img/copo.png";
import Seta from "../Seta";
import Check from "../Check";

const Pag3 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.horizontal}>
      <div className={styles.pag3}>
        <div className={styles.titulop3}>
          <h1 className="fontePrincipal">POR QUE USAR?</h1>
        </div>

        <div className={styles.copop3}>
          <img src={copo} alt="Copo" />
        </div>

        <div className={styles.anelp3}></div>

        <div className={styles.listap3}>
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

export default Pag3;