const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Port = db.define("Port", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function portInit() {
  const amount = await Port.count();
  if (amount === 0) {
    await Port.bulkCreate([
      { name: "Pelabuhan Tanjung Priok", phoneNumber: "085000000001" },
      { name: "Pelabuhan Merak", phoneNumber: "085000000002" },
      { name: "Pelabuhan Harbor Bay", phoneNumber: "085000000003" },
      { name: "Pelabuhan Sunda Kelapa", phoneNumber: "085000000004" },
      { name: "Pelabuhan Tanjung Perak", phoneNumber: "085000000005" },
      { name: "Pelabuhan Soekarno-Hatta", phoneNumber: "085000000006" },
      { name: "Pelabuhan Batam Center", phoneNumber: "085000000007" },
    ]);
  }
}

module.exports = { Port, portInit };
