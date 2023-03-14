const { DataTypes } = require("sequelize");
const db = require("../config/database");
const { Company } = require("./companyModel");

const Container = db.define("Container", {
  containerNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sealNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sizeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grossWeight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  depoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Container.belongsTo(Company, {
  foreignKey: "depoId",
});

module.exports = { Container };
