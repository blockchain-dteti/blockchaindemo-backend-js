const { Sequelize } = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const port = db.define('ports', {
    name: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    region: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

module.exports = port