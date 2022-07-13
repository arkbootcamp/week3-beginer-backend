const express = require('express')
const router = express.Router()
const paymentControler = require('../controller/payment')
// const { protect, isAdmin } = require('../middlewares/auth')

//  ----> /category.....
router
  .get('/:id', paymentControler.checkStatus)
  .post('/pay',  paymentControler.pay)
// .put('/:id', categoryControler.updateCategory)
module.exports = router
