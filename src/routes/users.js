const express = require('express')
const router = express.Router()
const { register, login, profile, deleteUser, refreshToken } = require('../controller/users.js')
const { protect } = require('../middlewares/auth.js')

router
  .post('/register', register)
  .post('/login', login)
  .post('/refresh-token', refreshToken)
  .get('/profile', protect ,profile)
  .delete('/:id', deleteUser)

module.exports = router
