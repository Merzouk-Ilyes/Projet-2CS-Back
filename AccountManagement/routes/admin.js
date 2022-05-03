const express = require('express')
const router = express.Router()
const {
  getAllAccounts,
  validateEmail,
  validateAccount,
  deleteUser,
} = require('../controllers/admin')

router.get('/accounts', getAllAccounts)
router.post('/validateEmail', validateEmail)
router.post('/validateAccount', validateAccount)
router.post('/deleteUser', deleteUser)

module.exports = router
