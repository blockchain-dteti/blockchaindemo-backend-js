const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.ENUM("SL", "CO"),
    allowNull: false,
  },
});

module.exports = { User };
