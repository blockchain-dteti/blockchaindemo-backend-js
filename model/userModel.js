const {Sequelize} = require('sequelize');
const db = require('../config/database');

const {DataTypes} = Sequelize;

const users = db.define('users', {
    name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

module.exports = users;