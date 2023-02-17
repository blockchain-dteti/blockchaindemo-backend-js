const { Sequelize } = require('sequelize')

const db = new Sequelize('blockchainDb', 'postgres', 'atA_251201', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;