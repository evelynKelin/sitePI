// backend-api/models/Avaliacao.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Avaliacao = sequelize.define('Avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  produtoNome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 } // Garante que a nota é de 1 a 5
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true, // Comentário pode ser opcional
  },
  // ClienteId será adicionado automaticamente
}, {
  tableName: 'avaliacoes',
});

// Define a relação: Um Cliente pode ter VÁRIAS Avaliações
Cliente.hasMany(Avaliacao);
Avaliacao.belongsTo(Cliente); // Uma Avaliação pertence a UM Cliente

module.exports = Avaliacao;