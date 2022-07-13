const express = require('express')
const router = express.Router()
const categoryRoute = require('./category')
const productRoute = require('./products')
const usersRoute = require('./users')
const paymentRoute = require('./payment')

router
  .use('/category', categoryRoute)
  .use('/products', productRoute)
  .use('/users', usersRoute)
  .use('/category', categoryRoute)
  .use('/payment', paymentRoute)

module.exports = router
