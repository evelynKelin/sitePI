// src/pages/PaginaHistorico.jsx (Corrigido)
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// CORREÇÃO 1: O caminho deve ser '../' para subir um diretório
import { UserContext } from '../UserContext'; 

// CORREÇÃO 2: O caminho do CSS também deve ser '../'
import '../App.css'; 
import styles from './PaginaHistorico.module.css'; 

export default function PaginaHistorico() {
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    // Se não tem usuário, volta pro login
    if (!usuario) {
      navigate('/login');
      return;
    }

    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/pedidos/${usuario.id}`);
        
        if (!response.ok) {
          throw new Error('Não foi possível buscar o histórico.');
        }
        
        const data = await response.json();
        setPedidos(data);
        setErro('');

      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [usuario, navigate]);

  // Usa os estilos do módulo
  if (loading) {
    return <div className={styles.paginaFundo}><div className={styles.quad}><h2>Carregando histórico...</h2></div></div>;
  }

  if (erro) {
    return <div className={styles.paginaFundo}><div className={styles.quad}><h2 className={styles.erro}>{erro}</h2></div></div>;
  }

  return (
    <div className={styles.paginaFundo}>
      <div className={styles.quad}>
        <h2>Seu Histórico de Compras</h2>
        
        {pedidos.length === 0 ? (
          <p>Você ainda não fez nenhum pedido.</p>
        ) : (
          pedidos.map(pedido => (
            // A classe 'historico-pedido' vem do App.css (global)
            <div key={pedido.id} className="historico-pedido"> 
              <h4>Pedido #{pedido.id} - Data: {new Date(pedido.createdAt).toLocaleDateString()}</h4>
              <p><strong>Total: R${pedido.total.toFixed(2)}</strong></p>
              <ul>
                {pedido.ItemPedidos.map(item => (
                  <li key={item.id}>
                    {item.quantidade}x {item.nome_produto} (R$ {item.preco_unitario.toFixed(2)} cada)
                  </li>
                ))}
              </ul>
              <hr style={{border: '0', borderTop: '1px solid #444'}} />
            </div>
          ))
        )}
        <button className="btn-login" style={{borderColor: '#a020f0', color: '#a020f0', background: 'transparent'}} onClick={() => navigate('/pag5')}>
          Continuar Comprando
        </button>
      </div>
    </div>
  );
}