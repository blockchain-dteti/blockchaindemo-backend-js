const { DataTypes } = require("sequelize");
const db = require("../config/database");
const { Company } = require("./companyModel");
const { Container } = require("./containerModel");
const { Port } = require("./portModel");
const { ShippingAgency } = require("./shippingAgency");

const DeliveryOrder = db.define("DeliveryOrder", {
  blockChainId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shippingAgencyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notifyPartyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  consigneeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shipperId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  portOfDischargeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  portOfDeliveryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  portOfLoadingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doExpiredDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  vessel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  voyageNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("APPROVED", "REJECTED", "ON PROCESS"),
    allowNull: false,
  },
});

DeliveryOrder.belongsTo(ShippingAgency, {
  foreignKey: "shippingAgencyId",
});
DeliveryOrder.belongsTo(Company, {
  foreignKey: "notifyPartyId",
});
DeliveryOrder.belongsTo(Company, {
  foreignKey: "consigneeId",
});
DeliveryOrder.belongsTo(Company, {
  foreignKey: "shipperId",
});
DeliveryOrder.belongsTo(Port, {
  foreignKey: "portOfDischargeId",
});
DeliveryOrder.belongsTo(Port, {
  foreignKey: "portOfDeliveryId",
});
DeliveryOrder.belongsTo(Port, {
  foreignKey: "portOfLoadingId",
});
DeliveryOrder.belongsToMany(Container, {
  through: "DeliveryOrderContainer",
});

module.exports = { DeliveryOrder };
