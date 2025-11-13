// backend-api/models/ItemPedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');

const ItemPedido = sequelize.define('ItemPedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome_produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // PedidoId será adicionado automaticamente
}, {
  tableName: 'itens_pedido',
  timestamps: false // Não precisa de 'createdAt' para os itens
});

// Define a relação: Um Pedido pode ter VÁRIOS Itens
Pedido.hasMany(ItemPedido);
ItemPedido.belongsTo(Pedido); // Um Item pertence a UM Pedido

module.exports = ItemPedido;