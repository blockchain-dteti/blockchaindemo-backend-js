const deliveryOrder = require('../model/deliveryOrderModel')

exports.newDO = async (req, res) => {
    const { bl_number, do_number, expiry_date, vessel_name, voyage_number, shipping_agency, notify_party, consignee, shipper, port_of_loading, port_of_discharge, place_of_delivery, size_type, gross_weight, depo_name } = req.body
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
            size_type: size_type,
            gross_weight: gross_weight,
            depo_name: depo_name
        });
        res.json({ msg: "DO Ditambahkan" })
    } catch (error) {
        console.log(error)
    }
}