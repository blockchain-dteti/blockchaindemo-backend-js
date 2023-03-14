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
      { name: "Agen Pelayaran A", phoneNumber: "085000000001" },
      { name: "Agen Pelayaran B", phoneNumber: "085000000002" },
      { name: "Agen Pelayaran C", phoneNumber: "085000000003" },
      { name: "Agen Pelayaran D", phoneNumber: "085000000004" },
      { name: "Agen Pelayaran E", phoneNumber: "085000000005" },
      { name: "Agen Pelayaran F", phoneNumber: "085000000006" },
      { name: "Agen Pelayaran G", phoneNumber: "085000000007" },
    ]);
  }
}

module.exports = { ShippingAgency, shippingAgencyInit };
