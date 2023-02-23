const express = require('express');
const {getNotifications, newNotifications, updateNotifications} = require('../controller/notification')


const route = express.Router()

route.get('/notifications', getNotifications)
//route.post('/notifications', newNotifications)
//route.put('/notifications', updateNotifications)



module.exports = route;