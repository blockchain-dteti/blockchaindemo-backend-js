const { Sequelize } = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const deliveryOrder = db.define('deliveryOrders', {
    bl_number: {
        type: DataTypes.STRING
    },
    do_number: {
        type: DataTypes.STRING
    },
    expiry_date: {
        type: DataTypes.DATE
    },
    vessel_name: {
        type: DataTypes.STRING
    },
    voyage_number: {
        type: DataTypes.STRING
    },
    shipping_agency: {
        type: DataTypes.STRING
    },
    notify_party: {
        type: DataTypes.STRING
    },
    consignee: {
        type: DataTypes.STRING
    },
    shipper: {
        type: DataTypes.STRING
    },
    port_of_loading: {
        type: DataTypes.STRING
    },
    port_of_discharge: {
        type: DataTypes.STRING
    },
    place_of_delivery: {
        type: DataTypes.STRING
    },
    size_type: {
        type: DataTypes.STRING
    },
    gross_weight: {
        type: DataTypes.FLOAT
    },
    depo_name: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = deliveryOrder;