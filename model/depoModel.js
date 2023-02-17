const { Sequelize } = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const depo = db.define('depos', {
    depo_name: {
        type: DataTypes.STRING
    },
    port_of_discharge: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = depo;