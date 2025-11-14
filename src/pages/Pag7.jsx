// src/pages/Pag7.jsx (Corrigido)
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext"; 
import styles from "./Pag7.module.css"; 

const Pag7 = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { usuario } = useContext(UserContext);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const shipping = 10;

  const alterarQuantidade = (id, tipo) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantidade: tipo === "mais" ? item.quantidade + 1 : Math.max(1, item.quantidade - 1) }
          : item
      )
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const total = subtotal + shipping;
  const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

  const handleFinalizarCompra = async () => {
    setErro('');
    if (!usuario) {
      setErro('Você precisa fazer login para finalizar a compra.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    if (cart.length === 0) {
      setErro('Seu carrinho está vazio.');
      return;
    }
    setLoading(true);
    try {
      const dadosPedido = {
        clienteId: usuario.id,
        carrinho: cart,
        total: total,
      };
      const response = await fetch('http://localhost:3001/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosPedido),
      });
      if (!response.ok) throw new Error('Não foi possível salvar seu pedido.');
      setCart([]);
      navigate('/historico');
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pag7Body}>
      <h1 className={styles.pag7Title}>Carrinho</h1>
      <main className={styles.pag7Main}>
        <section className={styles.pag7CartTable}>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.pag7ProductInfo}>
                      <img src={item.imagem} alt={item.nome} />
                      <div><strong>{item.nome}</strong></div>
                    </div>
                  </td>
                  <td>R${item.preco}</td>
                  <td>
                    <div className={styles.pag7QuantityControl}>
                      <button onClick={() => alterarQuantidade(item.id, "menos")}>−</button>
                      <input type="text" value={item.quantidade} readOnly />
                      <button onClick={() => alterarQuantidade(item.id, "mais")}>+</button>
                    </div>
                  </td>
                  <td>R${(item.preco * item.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className={styles.pag7Summary}>
          <h3>Resumo do Pedido</h3>
          <div className={styles.pag7SummaryRow}>
            <span>Itens</span>
            <span>{totalItens}</span>
          </div>
          <div className={styles.pag7SummaryRow}>
            <span>Subtotal</span>
            <span>R${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.pag7SummaryRow}>
            <span>Frete</span>
            <span>R${shipping.toFixed(2)}</span>
          </div>
          <hr />
          <div className={styles.pag7SummaryRow}>
            <strong>Total</strong>
            <strong>R${total.toFixed(2)}</strong>
          </div>
          <button 
            className={styles.pag7CheckoutBtn} 
            onClick={handleFinalizarCompra}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Finalizar Compra'}
          </button>
          {/* ESTA LINHA FOI CORRIGIDA */}
          {erro && <p className={styles.erro}>{erro}</p>}
        </aside>
      </main>
      <button className={styles.pag7ContinueBtn} onClick={() => navigate("/pag5")}>
        ← Continuar comprando
      </button>
    </div>
  );
};

export default Pag7;