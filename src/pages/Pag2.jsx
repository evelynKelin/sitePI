// src/pages/Pag2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pag2.module.css"; // Estilos da Pag2

// Componentes e Assets
import copo from "../assets/img/copo.png";
import Seta from "../Seta";
import Verificado from "../Verificado";

const Pag2 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.vertical}>
      <div className={styles.pai2}>
        <div className={styles.pag2}>
          <div className={styles.f1p2}>
            <h1 className="fontePrincipal">O que é esse copo?</h1>
          </div>

          <div className={styles.copop2}>
            <img src={copo} alt="Copo" />
          </div>

          <div className={styles.anelp2}></div>

          <div className={styles.listap2}>
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

export default Pag2;