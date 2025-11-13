// backend-api/models/Pedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // ClienteId será adicionado automaticamente pela associação
}, {
  tableName: 'pedidos',
});

// Define a relação: Um Cliente pode ter VÁRIOS Pedidos
Cliente.hasMany(Pedido);
Pedido.belongsTo(Cliente); // Um Pedido pertence a UM Cliente

module.exports = Pedido;