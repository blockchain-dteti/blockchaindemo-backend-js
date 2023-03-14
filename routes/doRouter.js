const express = require("express");
const { newDO, getDOs } = require("../controller/delivery");

const route = express.Router();

route.post("", newDO);
route.get("", getDOs);

module.exports = route;
