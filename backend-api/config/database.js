// backend-api/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // PostgreSQL
    logging: false, 
  }
);

module.exports = sequelize;