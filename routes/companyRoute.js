const express = require("express");
const { getCompanies } = require("../controller/company");

const route = express.Router();

route.get("", getCompanies);

module.exports = route;
