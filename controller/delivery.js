const { DeliveryOrder } = require("../model/deliveryOrderModel");
const { Company } = require("../model/companyModel");
const { Port } = require("../model/portModel");
const { ShippingAgency } = require("../model/shippingAgency");
const { Container } = require("../model/containerModel");
const SmartContract = require("../service/thirdweb");
const moment = require("moment");
const { randomString } = require("../helper/random");

exports.newDO = async (req, res) => {
  const {
    shippingAgencyId,
    notifyPartyId,
    consigneeId,
    shipperId,
    portOfDischargeId,
    portOfDeliveryId,
    portOfLoadingId,
    containers,
  } = req.body;
  try {
    const doNumber = randomString(10);
    // const blNumber = randomString(14);
    // const voyageNumber = randomString(4);
    // const vessel = "XIN YANG PU";
    // const doExpiredDate = moment().add(1, "month");

    const shippingAgencyData = await ShippingAgency.findByPk(shippingAgencyId);
    const notifyPartyData = await Company.findByPk(notifyPartyId);
    const consigneeData = await Company.findByPk(consigneeId);
    const shipperData = await Company.findByPk(shipperId);
    const portOfDischargeData = await Port.findByPk(portOfDischargeId);
    const portOfDeliveryData = await Port.findByPk(portOfDeliveryId);
    const portOfLoadingData = await Port.findByPk(portOfLoadingId);

    const containersModelData = [];
    const containersData = await Promise.all(
      containers.map(async (container) => {
        const depoData = await Company.findByPk(container.depoId);
        const containerData = {
          containerNumber: randomString(11),
          sealNumber: randomString(8),
          sizeType: container.sizeType,
          grossWeight: container.grossWeight,
          depoName: depoData.name,
          phoneNumber: depoData.phoneNumber,
        };
        containersModelData.push({
          containerNo: containerData.containerNumber,
          sealNo: containerData.sealNumber,
          sizeType: container.sizeType,
          grossWeight: container.grossWeight,
          depoId: container.depoId,
        });
        return containerData;
      })
    );

    const contractData = await SmartContract.get().call(
      "createRequestDO",
      doNumber,
      shippingAgencyData.name,
      process.env.WALLET_ADDRESS,
      notifyPartyData.name,
      consigneeData.name,
      shipperData.name,
      portOfLoadingData.name,
      portOfDischargeData.name,
      portOfDeliveryData.name,
      "",
      containersData
    );

    console.log("Onchain data created:", contractData);

    const containerData = await Container.bulkCreate(containersModelData);
    const doData = await DeliveryOrder.create({
      blockChainId: await DeliveryOrder.count(),
      shippingAgencyId,
      notifyPartyId,
      consigneeId,
      shipperId,
      portOfDischargeId,
      portOfDeliveryId,
      portOfLoadingId,
      blNumber: undefined,
      doNumber,
      doExpiredDate: undefined,
      vessel: undefined,
      voyageNumber: undefined,
      status: "ON PROCESS",
    });
    await doData.addContainers(containerData);

    console.log("Offchain data created", doData);

    res.json({ msg: "DO Ditambahkan" });
  } catch (error) {
    console.error(error);
  }
};

exports.getDOs = async (req, res) => {
  try {
    const { includes } = req.query;
    let include = [];
    if (includes?.includes("Container")) {
      include.push(Container);
    }
    if (includes?.includes("ShippingAgency")) {
      include.push(ShippingAgency);
    }
    if (includes?.includes("NotifyParty")) {
      include.push({ model: Company, as: "NotifyParty" });
    }
    if (includes?.includes("Consignee")) {
      include.push({ model: Company, as: "Consignee" });
    }
    if (includes?.includes("Shipper")) {
      include.push({ model: Company, as: "Shipper" });
    }
    if (includes?.includes("Depo")) {
      // FIXME: Join Depo to each Container efficiently
      // include.push({ model: Company, as: "Depo" });
    }
    if (includes?.includes("PortOfDischarge")) {
      include.push({ model: Port, as: "PortOfDischarge" });
    }
    if (includes?.includes("PortOfDelivery")) {
      include.push({ model: Port, as: "PortOfDelivery" });
    }
    if (includes?.includes("PortOfLoading")) {
      include.push({ model: Port, as: "PortOfLoading" });
    }
    const dos = await DeliveryOrder.findAll({
      include,
    });
    res.status(200).json(dos);
  } catch (error) {
    console.error(error);
  }
};

exports.getDepot = async (req, res) => {
  try {
    const depot = await depo.findAll({
      attributes: "name",
    });
    res.status(200).json(depot);
  } catch (error) {
    console.error(error);
  }
};

exports.newDepot = async (req, res) => {
  try {
    const { name, address } = req.body;
    try {
      await depo.create({
        name: name,
        address: address,
      });
      res.json({
        msg: "New Port addedd",
      });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getPort = async (req, res) => {
  try {
    const ports = await port.findAll({
      attributes: "name",
    });
    res.status(200).json(ports);
  } catch (error) {
    console.error(error);
  }
};

exports.newPort = async (req, res) => {
  try {
  } catch (error) {}
};

exports.getShipping = async (req, res) => {
  try {
    const agency = await shipping.findAll({
      attributes: "name",
    });
    res.status(200).json(agency);
  } catch (error) {
    console.error(error);
  }
};
