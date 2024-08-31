const { Sequelize } = require('sequelize');
require('dotenv').config;

const sequelize = new Sequelize('biblioteca', 'root', 'cimatec', {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;