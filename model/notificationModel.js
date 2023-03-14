const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Notification = db.define("Notification", {
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notificationsType: {
    type: DataTypes.ENUM("APPROVED", "REJECTED", "PENDING"),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Notification };
