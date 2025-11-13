// src/App.jsx
import React, { useState, useContext } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
// ... no topo do App.jsx
import { UserContext } from "./UserContext";
import PaginaHistorico from './PaginaHistorico'; 
import SeletorEstrelas from './SeletorEstrelas';


import copo from "./assets/img/copo.png";
import logo from "./assets/img/logo.png";
import adicionar from "./assets/img/adicionar.png";
import prod1 from "./assets/img/prod1.png";
import prod2 from "./assets/img/prod2.png";
import prod3 from "./assets/img/prod3.png";
import prod4 from "./assets/img/prod4.png";
import prod5 from "./assets/img/prod5.png";
import prod6 from "./assets/img/prod6.png";
import prod7 from "./assets/img/prod7.png";
import prod8 from "./assets/img/prod8.png";

import "./App.css";

import Verificado from "./Verificado";
import Check from "./Check";
import Seta from "./Seta";
import Estrela from "./Estrela";

/* ==================== PÁGINAS ==================== */

// Página 2
const Pag2 = () => {
  const navigate = useNavigate();

  return (
    <div id="vertical">
      <div id="pai2">
        <div id="pag2">
          <div id="f1p2">
            <h1 className="fontePrincipal">O que é esse copo?</h1>
          </div>

          <div id="copop2">
            <img src={copo} alt="Copo" />
          </div>

          <div className="anelp2"></div>

          <div id="listap2">
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

// Página 3
const Pag3 = () => {
  const navigate = useNavigate();

  return (
    <div id="horizontal">
      <div id="pag3">
        <div id="titulop3">
          <h1 className="fontePrincipal">POR QUE USAR?</h1>
        </div>

        <div id="copop3">
          <img src={copo} alt="Copo" />
        </div>

        <div className="anelp3"></div>

        <div id="listap3">
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

// Página 4
// Página 4 (DENTRO DO App.jsx)
const Pag4 = () => {
  const navigate = useNavigate();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ID do produto "Modelo Copo" (vamos assumir que é o ID 2: Copo Térmico Preto)
  const ID_PRODUTO_COPO = 2; 

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        setLoading(true);
        // Busca avaliações do produto ID 2
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
  }, []); // Roda só uma vez

  // Função para renderizar as estrelas de uma avaliação
  const RenderEstrelas = ({ nota }) => {
    return (
      <div id="Estrelas">
        {/* Cria um array de 'nota' posições e renderiza uma estrela para cada */}
        {[...Array(nota)].map((_, i) => <Estrela key={i} />)}
        {/* Se a nota for menor que 5, preenche com estrelas "vazias" (cinzas) */}
        {[...Array(5 - nota)].map((_, i) => <Estrela key={`vazia-${i}`} fill="grey" stroke="grey" />)}
      </div>
    );
  };

  return (
    <div id="horizontal">
      <div id="titulop4">
        <h1 className="fontePrincipal">Avaliações</h1>
      </div>

      <div id="copop4">
        <img src={copo} alt="Copo" />
      </div>

      <div className="anelp4"></div>

      {/* Mapeamento dinâmico das avaliações */}
      {loading ? (
        <div id="c1"><p>Carregando avaliações...</p></div>
      ) : avaliacoes.length === 0 ? (
         <div id="c1"><p>Este produto ainda não tem avaliações.</p></div>
      ) : (
        // Pega as 4 primeiras avaliações
        avaliacoes.slice(0, 4).map((avaliacao, index) => (
          <div id={`containers${index + 1}`} key={avaliacao.id}>
            <div id={`c${index + 1}`}>
              <RenderEstrelas nota={avaliacao.nota} />
              <p>“{avaliacao.comentario || "O usuário não deixou um comentário."}”</p>
              {/* Incluímos o nome do cliente que veio do 'include' na API */}
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
//Página 5 - Produtos

// Array de produtos

const produtos = [
  { id: 1, nome: "Washbag", img: prod1, imagem: adicionar },
  { id: 2, nome: "Copo Térmico Preto", img: prod2, imagem: adicionar },
  { id: 3, nome: "Kit Washbag", img: prod3, imagem: adicionar },
  { id: 4, nome: "Garrafa Térmica", img: prod4, imagem: adicionar },
  { id: 5, nome: "Colar Black", img: prod5, imagem: adicionar },
  { id: 6, nome: "Bomba para Chimarrão", img: prod6, imagem: adicionar },
  { id: 7, nome: "Colar Banshee", img: prod7, imagem: adicionar },
  { id: 8, nome: "Bolsa", img: prod8, imagem: adicionar },
];

// 🔹 Tabela de preços
const precos = {
  1: 160,
  2: 120,
  3: 200,
  4: 180,
  5: 90,
  6: 75,
  7: 110,
  8: 140,
};

// Página 5 - Produtos
const Pag5 = () => {
  const navigate = useNavigate();
  const linha1 = produtos.slice(0, 4);
  const linha2 = produtos.slice(4, 8);

  return (
    <div id="produtos-container">
      <div className="linha">
        {linha1.map((produto) => (
          <div key={produto.id} className="prod">
            <img src={produto.img} alt={produto.nome} className="foto-produto" />
            <img
              src={produto.imagem}
              alt="Adicionar"
              className="cruz"
              onClick={() => navigate(`/produto/${produto.id}`)}
            />
          </div>
        ))}
      </div>

      <div className="linha">
        {linha2.map((produto) => (
          <div key={produto.id} className="prod">
            <img src={produto.img} alt={produto.nome} className="foto-produto" />
            <img
              src={produto.imagem}
              alt="Adicionar"
              className="cruz"
              onClick={() => navigate(`/produto/${produto.id}`)}
            />
          </div>
        ))}
      </div>

      <Seta direcao="arrow_back" onClick={() => navigate("/")} className="seta-esquerda" />
    </div>
  );
};

// Página 6 - Detalhe do produto
const Pag6 = ({ adicionarAoCarrinho }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const produto = produtos.find((p) => p.id === parseInt(id));

  if (!produto) {
    return <h1>Produto não encontrado!</h1>;
  }

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
    <div id="pagina6">
      <div className="coluna-esquerda">
        <img src={produto.img} alt={produto.nome} className="imagem-pagina6" />
      </div>

      <div className="coluna-direita">
        <h1>{produto.nome}</h1>
        <p>{descricoes[produto.id]}</p>
        <h3>Preço: R${precos[produto.id]}</h3>

        <div className="botoes">
          <button
            className="whatsapp-btn"
            onClick={() => window.open("https://wa.me/5554991903324", "_blank")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
            />
            WhatsApp
          </button>

          <button
            className="cart-btn"
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
            <span className="divider"></span>
            <span>+</span>
          </button>
        </div>
      </div>

      <Seta direcao="arrow_back" onClick={() => navigate("/pag5")} className="seta-esquerda" />
    </div>
  );
};

// Página 7 - Carrinho
// Página 7 - Carrinho (DENTRO DO App.jsx)
const Pag7 = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { usuario } = useContext(UserContext); // <-- 1. Pegar o usuário logado
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const shipping = 10;

  // Função de alterar quantidade continua igual...
  const alterarQuantidade = (id, tipo) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade:
                tipo === "mais"
                  ? item.quantidade + 1
                  : item.quantidade > 1
                  ? item.quantidade - 1
                  : 1,
            }
          : item
      )
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  const total = subtotal + shipping;
  const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

  // <-- 2. Função para finalizar a compra
  const handleFinalizarCompra = async () => {
    setErro('');

    // 2.1. Verifica se o usuário está logado
    if (!usuario) {
      setErro('Você precisa fazer login para finalizar a compra.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // 2.2. Verifica se o carrinho não está vazio
    if (cart.length === 0) {
      setErro('Seu carrinho está vazio.');
      return;
    }
    
    setLoading(true);

    try {
      // 2.3. Prepara os dados para enviar à API
      const dadosPedido = {
        clienteId: usuario.id,
        carrinho: cart,
        total: total, // Envia o total (com frete)
      };

      const response = await fetch('http://localhost:3001/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosPedido),
      });

      if (!response.ok) {
        throw new Error('Não foi possível salvar seu pedido.');
      }

      // 2.4. Se deu certo: limpa o carrinho e navega para o histórico
      setCart([]);
      navigate('/historico');

    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pag7-body">
      <h1 className="pag7-title">Carrinho</h1>
      <main className="pag7-main">
        {/* A tabela continua igual... */}
        <section className="pag7-cart-table">
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
                    <div className="pag7-product-info">
                      <img src={item.imagem} alt={item.nome} />
                      <div>
                        <strong>{item.nome}</strong>
                        <br />
                      </div>
                    </div>
                  </td>
                  <td>R${item.preco}</td>
                  <td>
                    <div className="pag7-quantity-control">
                      <button onClick={() => alterarQuantidade(item.id, "menos")}>
                        −
                      </button>
                      <input type="text" value={item.quantidade} readOnly />
                      <button onClick={() => alterarQuantidade(item.id, "mais")}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>R${(item.preco * item.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* O resumo agora tem o botão modificado */}
        <aside className="pag7-summary">
          <h3>Resumo do Pedido</h3>
          <div className="pag7-summary-row">
            <span>Itens</span>
            <span>{totalItens}</span>
          </div>
          <div className="pag7-summary-row">
            <span>Subtotal</span>
            <span>R${subtotal.toFixed(2)}</span>
          </div>
          <div className="pag7-summary-row">
            <span>Frete</span>
            <span>R${shipping.toFixed(2)}</span>
          </div>
          <hr />
          <div className="pag7-summary-row">
            <strong>Total</strong>
            <strong>R${total.toFixed(2)}</strong>
          </div>
          
          {/* <-- 3. Botão modificado */}
          <button 
            className="pag7-checkout-btn" 
            onClick={handleFinalizarCompra}
            disabled={loading} // Desativa o botão enquanto carrega
          >
            {loading ? 'Salvando...' : 'Finalizar Compra'}
          </button>
          {erro && <p className="erro" style={{textAlign: 'center', marginTop: '10px'}}>{erro}</p>}
        </aside>
      </main>
      <button className="pag7-continue-btn" onClick={() => navigate("/pag5")}>
        ← Continuar comprando
      </button>
    </div>
  );
};


// Página Home
const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="vertical">
      <div id="pai">
        <div id="filho1">
          <h1 className="fontePrincipal">Modelo Copo</h1>
        </div>

        <div id="filho2">
          <img src={copo} alt="Copo" />
        </div>

        <div className="anelFundo"></div>

        <div id="filho3">
          <h2 className="fonteSecundaria">Algumas informações sobre o copo</h2>
          <p className="paragrafo">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...</p>
        </div>

        <div id="filho4">
          <div className="fundinho2">
            <h2 className="fonteSecundaria">O design</h2>
            <p className="paragrafo">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...</p>
          </div>
        </div>

        <Seta direcao="arrow_forward" onClick={() => navigate("/pag2")} className="seta-direita" />
      </div>
    </div>
  );
};

// Página Login
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.usuario);
        navigate("/perfil");
      } else {
        setErro(result.message || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  };

  return (
    <div id="login">
      <div id="quad">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
          <button type="submit">Entrar</button>
        </form>

        {erro && <p className="erro">{erro}</p>}
        <p className="trocaTela" onClick={() => navigate("/cadastro")}>
          Ainda não tem conta? Cadastre-se
        </p>
      </div>
    </div>
  );
};

// Página Cadastro (DENTRO DO SEU App.jsx)
// Copie e cole este bloco inteiro substituindo o seu componente Cadastro

const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  // 1. Atualizar o estado para incluir todos os campos do modelo
  const [form, setForm] = useState({
    email: "",
    senha: "",
    confirmar: "",
    nome: "",
    nascimento: "", // NOVO
    telefone: "",   // NOVO
    tipo: "pf",     // NOVO (pf = física, pj = jurídica)
    cpf: "",        // NOVO
    cnpj: "",       // NOVO
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    // 2. Validar campos
    if (!form.email || !form.senha || !form.confirmar || !form.nome || !form.nascimento || !form.telefone) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    if (form.tipo === 'pf' && !form.cpf) {
      setErro("Preencha o CPF.");
      return;
    }
    if (form.tipo === 'pj' && !form.cnpj) {
      setErro("Preencha o CNPJ.");
      return;
    }
    if (form.senha !== form.confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    // O backend não precisa do "confirmar"
    const { confirmar, ...dataToSend } = form;

    try {
      const response = await fetch("http://localhost:3001/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend), // Envia o formulário completo
      });

      const result = await response.json();

      if (response.ok) {
        setSucesso(true);
        setErro("");
        login(result.cliente); // Faz o login automático com os dados recebidos
        setTimeout(() => navigate("/perfil"), 1000); // Redireciona para o perfil
      } else {
        setErro(result.message || "Erro no cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  };

  // 3. Adicionar os novos inputs no JSX
  return (
    <div id="login">
      <div id="quad">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <input type="date" name="nascimento" placeholder="Data de Nascimento" value={form.nascimento} onChange={handleChange} />
          <input type="text" name="telefone" placeholder="Telefone (com DDD)" value={form.telefone} onChange={handleChange} />
          
          {/* --- Seleção de Tipo de Pessoa --- */}
          <div className="tipo-pessoa">
            <label>
              <input type="radio" name="tipo" value="pf" checked={form.tipo === 'pf'} onChange={handleChange} />
              Pessoa Física
            </label>
            <label>
              <input type="radio" name="tipo" value="pj" checked={form.tipo === 'pj'} onChange={handleChange} />
              Pessoa Jurídica
            </label>
          </div>

          {/* --- Campos Condicionais (CPF/CNPJ) --- */}
          {form.tipo === 'pf' ? (
            <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
          ) : (
            <input type="text" name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} />
          )}
          
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
          <input type="password" name="confirmar" placeholder="Confirmar senha" value={form.confirmar} onChange={handleChange} />
          
          <div className="botoes">
            <button type="submit" style={{width: '100%'}}>Cadastrar</button>
          </div>
        </form>

        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">Cadastro realizado com sucesso!</p>}

        <p onClick={() => navigate("/login")}>
          Já tem conta? Faça login
        </p>
      </div>
    </div>
  );
};

// Página Perfil (DENTRO DO App.jsx)
const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);

  // Estados para o formulário de avaliação
  const [formAvaliacao, setFormAvaliacao] = useState({
    produtoId: '2', // Vamos focar no 'Copo' (ID 2) por enquanto
    nota: 0,
    comentario: ''
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
    setErroAvaliacao('');
    setSucessoAvaliacao('');

    if (formAvaliacao.nota === 0) {
      setErroAvaliacao('Por favor, selecione uma nota (de 1 a 5 estrelas).');
      return;
    }

    // Pega o nome do produto da lista (do App.jsx)
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

      if (!response.ok) {
        throw new Error('Falha ao enviar avaliação.');
      }

      setSucessoAvaliacao('Avaliação enviada com sucesso!');
      // Limpa o formulário
      setFormAvaliacao({ ...formAvaliacao, nota: 0, comentario: '' });

    } catch (err) {
      setErroAvaliacao(err.message);
    }
  };

  return (
    <div id="login">
      <div id="quad" style={{ width: '600px', textAlign: 'left' }}>
        <h2>Perfil de {usuario ? usuario.nome.split(' ')[0] : "Usuário"}</h2>
        <p><strong>Nome:</strong> {usuario ? usuario.nome : "N/A"}</p>
        <p><strong>Email:</strong> {usuario ? usuario.email : "N/A"}</p>

        <button className="cancelar" onClick={() => navigate("/")} style={{width: '48%'}}>
          Voltar
        </button>
        {usuario && <button onClick={logout} style={{width: '48%'}}>Sair</button>}

        {/* --- Formulário de Avaliação --- */}
        <hr style={{ margin: '30px 0' }} />
        <h3>Deixar uma Avaliação</h3>
        <form onSubmit={handleSubmitAvaliacao}>
          <label>Produto:</label>
          {/* Usamos a lista de produtos do App.jsx */}
          <select 
            name="produtoId" 
            value={formAvaliacao.produtoId} 
            onChange={handleFormChange}
            style={{ width: '100%', padding: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '15px' }}
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
            style={{ width: '100%', minHeight: '80px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', padding: '10px' }}
          />

          <button type="submit" style={{ width: '100%', marginTop: '20px' }}>Enviar Avaliação</button>
          {erroAvaliacao && <p className="erro">{erroAvaliacao}</p>}
          {sucessoAvaliacao && <p className="sucesso">{sucessoAvaliacao}</p>}
        </form>
      </div>
    </div>
  );
};
/* ==================== APP PRINCIPAL ==================== */
export default function App() {
  const { usuario } = useContext(UserContext);

  // ✅ Estado do carrinho
  const [cart, setCart] = useState([]);

  // ✅ Função para adicionar produtos ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  return (
    <>
      <nav className="menuzinho">
        <ul>
          <li>
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </li>
          <li>
            {usuario ? (
              <Link to="/perfil" className="btn-login">
                Ver Perfil ({usuario.nome.split(" ")[0]})
              </Link>
            ) : (
              <Link to="/login" className="btn-login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pag2" element={<Pag2 />} />
        <Route path="/pag3" element={<Pag3 />} />
        <Route path="/pag4" element={<Pag4 />} />
        <Route path="/pag5" element={<Pag5 />} />
        {/* Passando a função para a página de detalhes */}
        <Route path="/produto/:id" element={<Pag6 adicionarAoCarrinho={adicionarAoCarrinho} />} />
        {/* Passando cart e setCart para a página do carrinho */}
        <Route path="/pag7" element={<Pag7 cart={cart} setCart={setCart} />} />
        {/* Rota do Histórico */}
        <Route path="/historico" element={<PaginaHistorico />} /> 
      </Routes>
    </>
  );
}