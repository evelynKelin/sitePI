// backend-api/models/Cliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garante que e-mails não se repetem
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_pessoa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(14),
    unique: true,
    allowNull: true, 
  },
  cnpj: {
    type: DataTypes.STRING(18),
    unique: true,
    allowNull: true,
  },
}, {
  tableName: 'clientes', // O nome da tabela no PostgreSQL
});

module.exports = Cliente;