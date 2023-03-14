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
      { name: "Pelabuhan A", phoneNumber: "085000000001" },
      { name: "Pelabuhan B", phoneNumber: "085000000002" },
      { name: "Pelabuhan C", phoneNumber: "085000000003" },
      { name: "Pelabuhan D", phoneNumber: "085000000004" },
      { name: "Pelabuhan E", phoneNumber: "085000000005" },
      { name: "Pelabuhan F", phoneNumber: "085000000006" },
      { name: "Pelabuhan G", phoneNumber: "085000000007" },
    ]);
  }
}

module.exports = { Port, portInit };
