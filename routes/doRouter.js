const express = require('express');
const { newDO } = require('../controller/delivery')

const route = express.Router()

route.post('/item', newDO)

module.exports = route;