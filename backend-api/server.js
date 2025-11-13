// backend-api/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database'); 
const Cliente = require('./models/Cliente');   // <--- SÓ UMA DESSA
const Pedido = require('./models/Pedido');     
const ItemPedido = require('./models/ItemPedido');
const Avaliacao = require('./models/Avaliacao');

require('dotenv').config(); // Carrega o .env

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares ---
// Permite que o frontend (ex: http://localhost:5173) acesse a API
app.use(cors()); 
// Permite que o servidor entenda JSON
app.use(express.json()); 

// --- Rotas da API ---

/**
 * ROTA DE CADASTRO
 * Recebe os dados do formulário do App.jsx
 */
app.post('/api/cadastro', async (req, res) => {
  try {
    const { email, senha, nome, nascimento, telefone, tipo, cpf, cnpj } = req.body;

    // 1. Validar se o email já existe
    const clienteExistente = await Cliente.findOne({ where: { email } });
    if (clienteExistente) {
      return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }

    // 2. Criptografar a senha
    const senha_hash = await bcrypt.hash(senha, 10); // 10 "salt rounds"

    // 3. Criar o cliente no banco
    const novoCliente = await Cliente.create({
      email,
      senha_hash,
      nome,
      data_nascimento: nascimento, // Ajusta nome do campo
      telefone,
      tipo_pessoa: tipo, // Ajusta nome do campo
      cpf: tipo === 'pf' ? cpf : null,
      cnpj: tipo === 'pj' ? cnpj : null,
    });

    // 4. Remover a senha hash antes de enviar de volta
    const { senha_hash: _, ...clienteFormatado } = novoCliente.get({ plain: true });

    // Envia o cliente de volta (para o UserContext fazer o login)
    res.status(201).json({ cliente: clienteFormatado });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
});

/**
 * ROTA DE LOGIN
 * Recebe email e senha do App.jsx
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Buscar o cliente pelo e-mail
    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
      return res.status(404).json({ message: 'E-mail ou senha incorretos.' });
    }

    // 2. Comparar a senha enviada com a senha criptografada no banco
    const senhaCorreta = await bcrypt.compare(senha, cliente.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    // 3. Remover a senha hash antes de enviar de volta
    const { senha_hash: _, ...clienteFormatado } = cliente.get({ plain: true });

    // Envia os dados do usuário para o UserContext
    res.status(200).json({ usuario: clienteFormatado });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

/**
 * ROTA PARA CRIAR UM PEDIDO (HISTÓRICO)
 * Recebe o carrinho e o ID do cliente
 */
app.post('/api/pedidos', async (req, res) => {
    try {
      const { clienteId, carrinho, total } = req.body;
  
      // 1. Criar o Pedido principal
      const novoPedido = await Pedido.create({
        total: total,
        ClienteId: clienteId, // Associa o pedido ao cliente
      });
  
      // 2. Criar os Itens do Pedido
      // Prepara um array de itens para o bulkCreate
      const itensParaSalvar = carrinho.map(item => ({
        nome_produto: item.nome,
        quantidade: item.quantidade,
        preco_unitario: item.preco,
        PedidoId: novoPedido.id, // Associa cada item ao pedido criado
      }));
  
      await ItemPedido.bulkCreate(itensParaSalvar);
  
      res.status(201).json({ message: 'Pedido criado com sucesso!', pedidoId: novoPedido.id });
  
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });
  
  /**
   * ROTA PARA BUSCAR O HISTÓRICO DE PEDIDOS DE UM CLIENTE
   */
  app.get('/api/pedidos/:clienteId', async (req, res) => {
    try {
      const { clienteId } = req.params;
  
      const pedidos = await Pedido.findAll({
        where: { ClienteId: clienteId },
        include: [ItemPedido], // Inclui os itens de cada pedido na resposta
        order: [['createdAt', 'DESC']], // Mais recentes primeiro
      });
  
      if (!pedidos) {
        return res.status(404).json({ message: 'Nenhum pedido encontrado.' });
      }
  
      res.status(200).json(pedidos);
  
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });

/**
 * ROTA PARA CRIAR UMA AVALIAÇÃO (COMENTÁRIO)
 */
app.post('/api/avaliacoes', async (req, res) => {
    try {
      const { clienteId, produtoId, produtoNome, nota, comentario } = req.body;
  
      const novaAvaliacao = await Avaliacao.create({
        produtoId,
        produtoNome,
        nota,
        comentario,
        ClienteId: clienteId, // Associa ao cliente
      });
  
      res.status(201).json({ message: 'Avaliação criada com sucesso!', avaliacao: novaAvaliacao });
  
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });
  
  /**
   * ROTA PARA BUSCAR AVALIAÇÕES DE UM PRODUTO
   * (Usaremos isso na Pag4 e Pag6)
   */
  app.get('/api/avaliacoes/:produtoId', async (req, res) => {
    try {
      const { produtoId } = req.params;
  
      const avaliacoes = await Avaliacao.findAll({
        where: { produtoId: produtoId },
        include: [Cliente], // Inclui os dados do cliente (para mostrar o nome)
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json(avaliacoes);
  
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });

// --- Inicialização do Servidor ---
const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o PostgreSQL estabelecida.');

    // Sincroniza os modelos com o banco (cria a tabela "clientes" se não existir)
    await sequelize.sync(); 
    console.log('🔄 Modelos sincronizados com o banco.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar com o banco:', error);
  }
};

iniciarServidor();