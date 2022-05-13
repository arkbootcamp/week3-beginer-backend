const express = require('express')
const productController = require('../controller/products')
const {protect, isAdmin} = require('../middlewares/auth')
const router = express.Router()
const upload = require('../middlewares/upload')
// const {hitCacheProductDetail, clearCacheProductDetial} = require('../middlewares/redis')

// -----> /products.....
router
  .get('/', productController.getProduct)
  .get('/:id', productController.detailProduct)
  .post('/', protect, upload.single('photo'), productController.insert)
  .put('/:id', productController.update)
  .delete('/:idproduct', productController.delete)

module.exports = router
