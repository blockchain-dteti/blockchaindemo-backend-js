const express = require('express');
const {getUser, newUser, login, logout} = require('../controller/users')
const { verifyToken } = require('../middleware/verifyToken')
const {refreshToken} = require('../controller/refreshToken')

const route = express.Router()

route.get('/users', verifyToken, getUser)
route.post('/users', newUser)
route.post('/login', login)
route.get('/token', refreshToken)
route.delete('/logout', logout)

module.exports = route;