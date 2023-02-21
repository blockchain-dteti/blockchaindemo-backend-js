const { Sequelize } = require("sequelize")
const db = require('../config/database')

const { DataTypes } = Sequelize

const shipping = db.define('shipper', {
    name: {
        type: DataTypes.STRING
    },
    region: {
        type: DataTypes.STRING
    },
    region: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

module.exports = shipping