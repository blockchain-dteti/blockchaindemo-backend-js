const {Client} = require('pg')
const {Sequelize} = require('sequelize')

const db = new Sequelize('mappingDIY','postgres','raven03',{
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;