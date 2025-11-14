// src/pages/Pag4.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pag4.module.css"; // Estilos da Pag4

// Componentes e Assets
import copo from "../assets/img/copo.png";
import Seta from "../Seta";
import Estrela from "../Estrela";

const Pag4 = () => {
  const navigate = useNavigate();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const ID_PRODUTO_COPO = 2; 

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/avaliacoes/${ID_PRODUTO_COPO}`);
        if (response.ok) {
          const data = await response.json();
          setAvaliacoes(data);
        }
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvaliacoes();
  }, []);

  const RenderEstrelas = ({ nota }) => {
    return (
      <div className={styles.estrelas}> {/* Usando classe local */}
        {[...Array(nota)].map((_, i) => <Estrela key={i} />)}
        {[...Array(5 - nota)].map((_, i) => <Estrela key={`vazia-${i}`} fill="grey" stroke="grey" />)}
      </div>
    );
  };

  return (
    <div className={styles.horizontal}> {/* Reutiliza o fundo da Pag3, se desejado, ou crie .fundoPag4 */}
      <div className={styles.titulop4}>
        <h1 className="fontePrincipal">Avaliações</h1>
      </div>

      <div className={styles.copop4}>
        <img src={copo} alt="Copo" />
      </div>

      <div className={styles.anelp4}></div>

      {loading ? (
        <div className={styles.c1}><p>Carregando avaliações...</p></div>
      ) : avaliacoes.length === 0 ? (
         <div className={styles.c1}><p>Este produto ainda não tem avaliações.</p></div>
      ) : (
        avaliacoes.slice(0, 4).map((avaliacao, index) => (
          <div id={`containers${index + 1}`} key={avaliacao.id}>
            {/* Mapeia c1, c2, c3, c4 para os estilos */}
            <div className={styles[`c${index + 1}`]}> 
              <RenderEstrelas nota={avaliacao.nota} />
              <p>“{avaliacao.comentario || "O usuário não deixou um comentário."}”</p>
              <p>- {avaliacao.Cliente ? avaliacao.Cliente.nome : "Usuário Anônimo"}</p>
            </div>
          </div>
        ))
      )}

      <Seta direcao="arrow_back" onClick={() => navigate("/pag3")} className="seta-esquerda" />
      <Seta direcao="arrow_forward" onClick={() => navigate("/pag5")} className="seta-direita" />
    </div>
  );
};

export default Pag4;