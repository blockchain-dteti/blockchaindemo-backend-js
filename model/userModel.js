const { Sequelize } = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const users = db.define('users', {
    email: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.ENUM('SL', 'CO')
    }
}, {
    freezeTableName: true
})

module.exports = users;