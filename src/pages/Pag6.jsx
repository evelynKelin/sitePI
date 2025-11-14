// src/pages/Pag6.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Pag6.module.css"; // Estilos da Pag6

// Importa os dados
import { produtos, precos } from "../data/products"; 
import Seta from "../Seta";

const Pag6 = ({ adicionarAoCarrinho }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const produto = produtos.find((p) => p.id === parseInt(id));

  if (!produto) {
    return <h1>Produto não encontrado!</h1>;
  }

  // Descrições locais da página
  const descricoes = {
    1: "Feita para acompanhar seu ritmo, a Washibag une praticidade e estilo em cada detalhe...",
    2: "Leve seu café ou chá com estilo. Este copo térmico preto combina elegância e praticidade...",
    3: "Pensado para quem valoriza organização e estilo, o Kit Washbag oferece praticidade em dobro...",
    4: "Com acabamento fosco e capacidade térmica prolongada, a Garrafa Térmica Black é ideal...",
    5: "Discreto e cheio de personalidade, o Colar Black é o acessório ideal...",
    6: "A Bomba Banshee une tradição e design contemporâneo...",
    7: "O Colar Banshee é delicado, elegante e cheio de personalidade...",
    8: "Resistente, prática e com um visual imponente. A Garrafa de Metal Black é ideal...",
  };

  return (
    <div className={styles.pagina6}>
      <div className={styles.colunaEsquerda}>
        <img src={produto.img} alt={produto.nome} className={styles.imagemPagina6} />
      </div>

      <div className={styles.colunaDireita}>
        <h1>{produto.nome}</h1>
        <p>{descricoes[produto.id]}</p>
        <h3>Preço: R${precos[produto.id]}</h3>

        <div className={styles.botoes}>
          <button
            className={styles.whatsappBtn}
            onClick={() => window.open("https://wa.me/5554991903324", "_blank")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
            />
            WhatsApp
          </button>

          <button
            className={styles.cartBtn}
            onClick={() => {
              adicionarAoCarrinho({
                id: produto.id,
                nome: produto.nome,
                preco: precos[produto.id],
                imagem: produto.img,
              });
              navigate("/pag7");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
              alt="Carrinho"
            />
            <span>MY CART</span>
            <span className={styles.divider}></span>
            <span>+</span>
          </button>
        </div>
      </div>

      <Seta direcao="arrow_back" onClick={() => navigate("/pag5")} className="seta-esquerda" />
    </div>
  );
};

export default Pag6;