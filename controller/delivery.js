const deliveryOrder = require('../model/deliveryOrderModel')
const depo = require('../model/depoModel')
const port = require('../model/portModel')
const shipping = require('../model/shippingAgency')
const { ThirdwebSDK } = require("@thirdweb-dev/sdk/evm");

exports.newDO = async (req, res) => {
    const { bl_number, do_number, expiry_date, vessel_name, voyage_number, shipping_agency, notify_party, consignee, shipper, port_of_loading, port_of_discharge, place_of_delivery, size_type, gross_weight, depo_name } = req.body
    const container = { voyage_number: voyage_number, size_type: size_type, gross_weight: gross_weight, depo_name: depo_name }
    try {
        await deliveryOrder.create({
            bl_number: bl_number,
            do_number: do_number,
            expiry_date: expiry_date,
            vessel_name: vessel_name,
            voyage_number: voyage_number,
            shipping_agency: shipping_agency,
            notify_party: notify_party,
            consignee: consignee,
            shipper: shipper,
            port_of_loading: port_of_loading,
            port_of_discharge: port_of_discharge,
            place_of_delivery: place_of_delivery,
            container: container
        });
        const sdk = new ThirdwebSDK("avalanche-fuji");
        const contract = await sdk.getContract("0x1a9CDeBF5c7434F0B65C6Ea8aedA31506902dF9b");
        const data = await contract.call("createRequestDO", do_number, shipping_agency, "0x24D5c12a26d13e13014C985B69487d823A61A896", notify_party, shipper, consignee, port_of_loading, port_of_discharge, place_of_delivery, container)
        res.json({ msg: "DO Ditambahkan" })
    } catch (error) {
        console.error(error)
    }
}

exports.getDepot = async (req, res) => {
    try {
        const depot = await depo.findAll({
            attributes: 'name'
        })
        res.status(200).json(depot)
    } catch (error) {
        console.log(error)
    }
}

exports.newDepot = async (req, res) => {
    try {
        const { name, address } = req.body
        try {
            await depo.create({
                name: name,
                address: address
            })
            res.json({
                msg: 'New Port addedd'
            })
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
}

exports.getPort = async (req, res) => {
    try {
        const ports = await port.findAll({
            attributes: 'name'
        })
        res.status(200).json(ports)
    } catch (error) {
        console.log(error)
    }
}

exports.newPort = async (req, res) => {
    try {

    } catch (error) {

    }
}

exports.getShipping = async (req, res) => {
    try {
        const agency = await shipping.findAll({
            attributes: 'name'
        })
        res.status(200).json(agency)
    } catch (error) {
        console.log(error)
    }
}



