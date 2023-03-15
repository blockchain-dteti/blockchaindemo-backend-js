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
  },
  doNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doExpiredDate: {
    type: DataTypes.DATE,
  },
  vessel: {
    type: DataTypes.STRING,
  },
  voyageNumber: {
    type: DataTypes.STRING,
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
  as: "NotifyParty",
});
DeliveryOrder.belongsTo(Company, {
  foreignKey: "consigneeId",
  as: "Consignee",
});
DeliveryOrder.belongsTo(Company, {
  foreignKey: "shipperId",
  as: "Shipper",
});
DeliveryOrder.belongsTo(Port, {
  foreignKey: "portOfDischargeId",
  as: "PortOfDischarge",
});
DeliveryOrder.belongsTo(Port, {
  foreignKey: "portOfDeliveryId",
  as: "PortOfDelivery",
});
DeliveryOrder.belongsTo(Port, {
  foreignKey: "portOfLoadingId",
  as: "PortOfLoading",
});
DeliveryOrder.belongsToMany(Container, {
  through: "DeliveryOrderContainer",
});

module.exports = { DeliveryOrder };
