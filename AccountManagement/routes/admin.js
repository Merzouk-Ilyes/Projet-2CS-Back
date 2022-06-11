const express = require('express')
const router = express.Router()
const {
  getAllAccounts,
  validateEmail,
  validateAccount,
  deleteUser,
} = require('../controllers/admin')

router.post('/validateEmail', validateEmail)
router.post('/validateAccount', validateAccount)
// router.post('/deleteUser', deleteUser)
router.get('/accounts', getAllAccounts)

module.exports = router
