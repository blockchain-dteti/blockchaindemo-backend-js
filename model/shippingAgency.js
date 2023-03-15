const { DataTypes } = require("sequelize");
const db = require("../config/database");

const ShippingAgency = db.define("ShippingAgency", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function shippingAgencyInit() {
  const amount = await ShippingAgency.count();
  if (amount === 0) {
    await ShippingAgency.bulkCreate([
      { name: "Agen Korea Marine Transport", phoneNumber: "085000000001" },
      { name: "Agen Japan Marine Transport", phoneNumber: "085000000002" },
    ]);
  }
}

module.exports = { ShippingAgency, shippingAgencyInit };
