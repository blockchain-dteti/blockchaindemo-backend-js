const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Company = db.define("Company", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function companyInit() {
  const amount = await Company.count();
  if (amount === 0) {
    await Company.bulkCreate([
      { name: "Perusahaan A", phoneNumber: "085000000001" },
      { name: "Perusahaan B", phoneNumber: "085000000002" },
      { name: "Perusahaan C", phoneNumber: "085000000003" },
      { name: "Perusahaan D", phoneNumber: "085000000004" },
      { name: "Perusahaan E", phoneNumber: "085000000005" },
      { name: "Perusahaan F", phoneNumber: "085000000006" },
      { name: "Perusahaan G", phoneNumber: "085000000007" },
    ]);
  }
}

module.exports = { Company, companyInit };
