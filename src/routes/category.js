const express = require('express')
const router = express.Router()
const categoryControler = require('../controller/category')
const { protect, isAdmin } = require('../middlewares/auth')

//  ----> /category.....
router
  .get('/',protect, categoryControler.getCategory)
  .post('/', protect, isAdmin, categoryControler.insertCategory)
// .put('/:id', categoryControler.updateCategory)
  .delete('/:id', categoryControler.deleteCategory)

module.exports = router
