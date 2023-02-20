const { Sequelize } = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const notifications = db.define('notification', {
    userID: {
        type: DataTypes.STRING
    },
    notificationsType: {
        type: DataTypes.ENUM('APPROVED', 'REJECTED', 'PENDING')
    },
    message: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.DATE
    },
}, {
    freezeTableName: true
})

module.exports = notifications;