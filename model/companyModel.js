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
      {
        name: "PT Macoline Notify Party / Consignee",
        phoneNumber: "085000000002",
      },
      {
        name: "PT Buana Notify Party / Consignee",
        phoneNumber: "085000000003",
      },
      {
        name: "PT Samudra Shipper",
        phoneNumber: "085000000004",
      },
      {
        name: "PT Mutiara Depo",
        phoneNumber: "085000012304",
      },
    ]);
  }
}

module.exports = { Company, companyInit };
